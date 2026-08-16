import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registeruser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "please fill all the required fields" });
  }

  const isuserAlreadyExist = await mongoose.findOne({ email });
  if (isuserAlreadyExist) {
    return res.status(400).json({ message: "User already exist" });
  } 
  else {
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await mongoose.create({
      username,
      email,
      password: hashedpassword,
    });

    // token contain all these things userid and username and it will expire in 5 hours
    const token = jwt.sign
    (
      {
        id: user._id,
        username: user.username,
      },
      process.env.jwt_secret,
      {
        expiresIn: "5 hrs",
      },
      
    );
    res.cookie("token", token)
    // user created successfully and send the response to the client
    res.status(201).json({
        message:"user registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
        },
        
    })
  }
}
