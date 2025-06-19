const express = require('express');
const router = express.Router();
const upload = require('../utils/uploadParser');
const controller = require('../controllers/chapterController');
const admin = require('../middlewares/adminMiddleware');

router.get('/', controller.getChapters);
router.get('/:id', controller.getChapterById);
router.post('/', admin, upload.single('file'), controller.uploadChapters);

module.exports = router;
