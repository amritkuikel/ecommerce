import jwt from "jsonwebtoken";
const tokenData = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    const user = jwt.verify(token, "asdfghjkl");
    req.user = user;
  }
  next();
};

export default tokenData;
