module.exports = (req, res, next) => {
  const isAdmin = req.headers['x-admin'] === 'true'; // Simulate admin via header
  if (!isAdmin) return res.status(403).json({ message: 'Admins only.' });
  next();
};
