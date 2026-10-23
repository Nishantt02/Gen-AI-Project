import bcrypt from "bcrypt";
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import tokenBlacklistModel from "../models/blackListToken.js";

export const registeruser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "please fill all the required fields" });
  }

  // user already exist or not check in the database
  const isuserAlreadyExist = await User.findOne({ email });
  if (isuserAlreadyExist) {
    return res.status(400).json({ message: "User already exist" });
  } else {
    // hash the password and create the new user
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedpassword,
    });

    // token contain all these things userid and username and it will expire in 5 hours
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.jwt_secret,
      {
        expiresIn: "5 hrs",
      },
    );
    // store the token into the cookie and send it to the brower or client
    res.cookie("token", token);

    // user created successfully and send the response to the client
    res.status(201).json({
      message: "user registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  }
};

// for the login of the user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "please fills all the required fileds" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "user not found" });
  } else {
    // compare the passoword with the hashed password in the database
    const isPassowrdMatch = await bcrypt.compare(password, user.password);
    if (!isPassowrdMatch) {
      res.status(400).json({ message: "invalid credentials" });
    } 
    else
       {
      const token = jwt.sign(
        {
          // store the user id and username in the token and it will expire in 5 hours
          id: user._id,
          username: user.username,
        },
        process.env.jwt_secret,
        {
          expiresIn: "5 hrs",
        },
      );

    
      res.cookie("token", token);
  console.log(token)
      res.status(201).json({
        message: "user loggined successfully",

        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    }
  }
};

export const logoutuser = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({ message: "user not logout" });
  } else {
    // add the token to the blacklist collection in the database
    await tokenBlacklistModel.create({ token });
    // clear the token from the cookie
    res.clearCookie("token");
    res.status(200).json({ message: "user logout successfully" });
  }
};

// get the details of the user from the database and send it to the client
export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }
  res.status(200).json({
    message: "user found successfully",

    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};
