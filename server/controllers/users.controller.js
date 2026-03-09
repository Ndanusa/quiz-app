import User from "../models/user.models.js";
import Message from "../models/message.models.js";

export const getUsers = async (req, res) => {
  const users = await User.find().select(
    "firstName lastName username email _id",
  );
  res.json(users);
};

export const postUser = async (req, res) => {
  console.log(req.body);
  res.send("change");
};
