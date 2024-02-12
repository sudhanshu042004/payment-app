require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      message: authHeader,
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(token, jwtSecret);
    if (decode.userId) {
      req.userId = decode.userId;
      next();
    } else {
      return res.status(403).send();
    }
  } catch (e) {
    return res.status(403).send();
  }
}
module.exports = { authMiddleware };
