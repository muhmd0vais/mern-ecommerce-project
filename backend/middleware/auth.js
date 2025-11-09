const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
  const header = req.header('Authorization');
  if (!header) return res.status(401).json({ msg: 'No token' });
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.id;
    next();
  } catch (e) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
