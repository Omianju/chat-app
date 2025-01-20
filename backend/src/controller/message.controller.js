import { messageModel } from "../model/message.model.js";
import { userModel } from "../model/user.model.js";
import { sendMessageSchema } from "../schemas/message.schema.js";
import cloudinary from "../lib/cloudinary.js";
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await userModel.find({
      _id: { $ne: loggedInUserId },
    });
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    // Fetch all messages exchanged between the current user (myId) and another user (userToChatId),
    // regardless of who sent or received them.
    const messages = await messageModel.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json({ messages });
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = sendMessageSchema.parse(req.body);
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const message = await messageModel.create({
      receiverId: userToChatId,
      senderId: myId,
      text: text || "",
      image: imageUrl || "",
    });


    // Realtime chat using socket.io
    res.status(201).json(message);
  } catch (error) {
    console.log("Error in sendMessage Controller: ", error.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
