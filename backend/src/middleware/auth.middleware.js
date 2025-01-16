import jwt from "jsonwebtoken";


import { userModel } from "../model/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorised - No Token Provided" });
    }

    const decode = jwt.decode(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(400).json({ message: "Unauthorised - Invalid Token" });
    }

    const user = await userModel.findById(decode.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
