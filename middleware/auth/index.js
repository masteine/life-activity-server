import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const env = dotenv.config({ path: "./.env" }).parsed;

export default function authMiddleware(req, res, next) {
  //get the token from the header if present
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  //if no token found, return response (without going to the next middleware)
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    //if can verify the token, set req.user and pass to next middleware
    req.user = jwt.verify(token, env.AUTH_SECRET_KEY);
    next();
  } catch (e) {
    //if invalid token
    res.status(400).send("Access denied. Invalid token.");
    return false;
  }
}
