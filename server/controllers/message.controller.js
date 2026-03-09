import mongoose from "mongoose";
import Message from "../models/message.models.js";

export const sendMessage = async (req, res) => {
  const { sender, message } = req.body;
  const newMessage = await Message.create({
    sender,
    message,
  });
  res.json({
    error: false,
  });
};

export const getMessages = async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
};
