import User from "../model/userSchema.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

// home rotute
const home = (req, res) => {
  res.send("<h1>Hello Koushik Saha Welcome to backend.</h1>");
};

// register a user
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!(firstName && lastName && email && password)) {
      throw new Error("All fields are Required.");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("User Already Exists.");
    }

    // hash the password
    const myPass = await bcrypt.hash(password, 10);
    let tasks = [];
    tasks[0] = "How";
    tasks[1] = "Are";
    tasks[2] = "You ?";

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: myPass,
      todos: [{ uuid: uuidv4(), title: `Hello ${firstName}`, tasks }],
    });

    await newUser.save();

    // create newToken
    const newToken = JWT.sign(
      {
        id: newUser._id,
        email,
      },
      process.env.SECRET_CODE,
      { expiresIn: process.env.EXPIRY_TIME }
    );

    newUser.password = undefined;
    newUser.token = newToken;

    res.status(200).json({
      success: true,
      newUser,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// login a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      throw new Error("Enter email and Password");
    }

    const existingUser = await User.findOne({ email });

    if (
      existingUser &&
      (await bcrypt.compare(password, existingUser.password))
    ) {
      // generate token for matching
      const newToken = JWT.sign(
        {
          id: existingUser._id,
          email,
        },
        process.env.SECRET_CODE,
        { expiresIn: process.env.EXPIRY_TIME }
      );

      existingUser.password = undefined;
      existingUser.token = newToken;

      const option = {
        exppires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      //   setting cookie
      res.status(200).cookie("token", newToken, option).json({
        success: true,
        existingUser,
      });
      //   console.log(existingUser.token);
    } else {
      throw new Error("Email and Password Incorrect");
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// dashboard
// const dashboard = (req, res) => {
//   res.status(200).json({
//     message: "welcome to dashboard",
//   });
// };

// dashboard2

const dashboard = (req, res) => {
  const { token } = req.cookies;
  //   console.log(token);

  if (!token) {
    res.status(500).json({ message: "token not found." });
  }
  try {
    let decode = JWT.verify(token, process.env.SECRET_CODE);
    // console.log(decode);
    // req.existingUser = decode;
    res.status(200).json({ message: "welcome to dashboard." });
  } catch (err) {
    res.status(500).json({ message: "token not valid" });
  }
};

export { home, register, login, dashboard };
