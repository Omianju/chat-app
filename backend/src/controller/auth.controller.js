import { generateToken } from "../lib/utils.js";
import { userModel } from "../model/user.model.js";
import { loginSchema, signUpSchema } from "../schemas/user.schema.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  try {
    const body = req.body;
    const { email, fullName, password } = signUpSchema.parse(body);

    const exitingUser = await userModel.findOne({ email });

    if (exitingUser) throw new Error("user already exists with this email");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      email,
      fullName,
      password: hashedPassword,
    });

    if (user) {
      generateToken(user._id, res);
      res.status(201).json(user);
    } else {
      res.status(400).json({
        message: "Invalid user data",
      });
    }
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json("Something went wrong");
  }
};

export const login = async (req, res) => {
  try {
    const body = req.body;
    const { email, password } = loginSchema.parse(body);

    const existingUser = await userModel.findOne({ email }).select("+password");

    if (!email) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(existingUser._id, res);

    res.status(200).json({
      _id: existingUser._id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      profilePic: existingUser.profilePic,
    });
  } catch (error) {
    console.log("Error in Login controller ", error.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("authToken", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in Logout controller ", error.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;

    if (!profilePic) {
      res.status(400).json({ message: "Profile pic is required!" });
    }

    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const user = await userModel.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );
    console.log(user);
    
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in updateProfile Controller: ", error.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
