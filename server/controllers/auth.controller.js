import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../schemas/users.schema.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const matchingEmail = await User.findOne({ email });
    if (matchingEmail) {
      res.statusCode = 404;
      return res.json({
        message: `"${email}" not avaliable`,
        type: "email",
        error: true,
      });
    }
    const matchingUsername = await User.findOne({ username });
    if (matchingUsername) {
      res.statusCode = 404;
      return res.json({
        message: `"${username}" not avaliable`,
        type: "username",
        error: true,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    res.json({
      message: "Account created succesfully, login to continue.",
      error: false,
      token,
      data: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.firstName,
        email: newUser.email,
        id: newUser._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.statusCode = 404;
      return res.json({
        message: `"${email}" not found`,
        error: true,
        type: "email",
      });
    }
    const matchingPassword = await bcrypt.compare(password, user.password);

    if (!matchingPassword) {
      res.statusCode = 404;
      return res.json({
        message: "Incorrect password",
        error: true,
        type: "password",
      });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.json({
      message: "Logged in successfully",
      error: false,
      token,
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        id: user._id,
      },
    });
  } catch (error) {}
};
export const signOut = async (req, res, next) => {};
