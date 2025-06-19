const Chapter = require('../models/Chapter');
const redis = require('../redisClient');

exports.getChapters = async (req, res) => {
  const key = JSON.stringify(req.query);
  const cached = await redis.get(key);
  if (cached) return res.json(JSON.parse(cached));

  const filters = {};
  ['class', 'unit', 'status', 'subject'].forEach(field => {
    if (req.query[field]) filters[field] = req.query[field];
  });

  if (req.query.weakChapters === 'true') filters.isWeakChapter = true;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [chapters, total] = await Promise.all([
    Chapter.find(filters).skip(skip).limit(limit),
    Chapter.countDocuments(filters)
  ]);

  const result = { total, chapters };
  await redis.set(key, JSON.stringify(result), 'EX', 3600); // Cache for 1hr

  res.json(result);
};

exports.getChapterById = async (req, res) => {
  const chapter = await Chapter.findById(req.params.id);
  if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
  res.json(chapter);
};

exports.uploadChapters = async (req, res) => {
  try {
    const buffer = req.file.buffer.toString('utf-8');
    const data = JSON.parse(buffer);

    const successes = [];
    const errors = [];

    for (const item of data) {
      try {
        const chapter = new Chapter(item);
        await chapter.validate();
        successes.push(chapter);
      } catch (err) {
        errors.push(item);
      }
    }

    await Chapter.insertMany(successes);
    await redis.flushall(); // Invalidate cache

    res.json({ inserted: successes.length, failed: errors.length, errors });
  } catch (e) {
    res.status(400).json({ message: 'Invalid JSON file' });
  }
};
