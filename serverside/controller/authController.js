import User from "../models/userModel.js";
import userToken from "../models/tokenModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mailSender from "../utils/nodeMailer.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.send({ success: false, msg: "user already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      await User.create({
        name: name,
        email: email,
        password: hash,
      });
      await mailSender(email);
      res.send({ success: true, msg: "user saved plz verify mail" });
    }
  } catch (error) {
    res.send({ success: false, msg: error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const pwdMatch = await bcrypt.compare(password, user.password);
      if (!pwdMatch) {
        res.send({
          success: false,
          msg: "password wrong for provided email",
        });
      } else {
        const token = await jwt.sign(
          { name: user.name, email: user.email },
          "asdfghjkl",
          { expiresIn: "30d" }
        );
        if (user.isVerified) {
          res.send({ success: true, msg: "login successful", token: token });
        } else {
          res.send({ success: false, msg: "plz verify email" });
        }
       
      }
    } else {
      res.send({ success: false, msg: "email doesnot exists" });
    }
  } catch (error) {
    res.send({ success: false, msg: error });
  }
};

export const userData = (req, res) => {
  try {
    const data = req.user;
    if (data) {
      res.send({ success: true, msg: "successful", data: data });
    } else {
      res.send({ success: false, msg: "sth went wrong" });
    }
  } catch (error) {
    res.send({ success: false, msg: error });
  }
};

export const updateData = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const pwdVerify = await bcrypt.compare(oldPassword, user.password);
    if (pwdVerify) {
      const salt = await bcrypt.genSalt(10);
      const pwdHash = await bcrypt.hash(newPassword, salt);
      await User.findOneAndUpdate({ email }, { password: pwdHash });
      res.send({ success: true, msg: "password updated successfully" });
    } else {
      res.send({ success: false, msg: "password wrong" });
    }
  } else {
    res.send({ success: false, msg: "invalid email" });
  }
};

export const verifyToken = async(req, res) => {
  const token = req.body.token;
  const isPresent = await userToken.findOne({token});
  if(isPresent){
    await User.findOneAndUpdate({_id:isPresent.userid},{isVerified:true})
    await userToken.findOneAndDelete({token})
    res.send({ success: true, msg: "email verified" });
  }
  else{
    res.send({ success: false, msg: "verification error" });
  }
  
};
