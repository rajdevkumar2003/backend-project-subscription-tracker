import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authorize = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return res.status(401).json({ message: "unauthorized" });

    const decode = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decode.userId);

    if (!user) return res.status(401).json({ message: "Unauthenticated" });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "unauthorized", error: error.message });
  }
};

export default authorize;
