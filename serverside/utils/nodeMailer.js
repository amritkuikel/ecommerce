import nodemailer from "nodemailer";
import User from "../models/userModel.js";
import userToken from "../models/tokenModel.js";
import bcrypt from "bcryptjs";

const mailSender = async (userEmail) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "amritkuikel5689@gmail.com",
      pass: "jsfbbvmbzctnrysw",
    },
  });
  const user = await User.findOne({ email: userEmail });
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(toString(user._id), salt)
  const hash2 = hash.replaceAll('/','')
  await userToken.create({
    token: hash2,
    userid: user._id,
  });
  const mailOptions = {
    from: "amritkuikel5689@gmail.com",
    to: userEmail,
    subject: "login verification",
    html: 
      `<div>
        <h1>click link below to verify</h1>
        <br />
        <a href="http://localhost:3000/verify/${hash2}">click me</a>
      </div>`
    ,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log("Error occurred:", error.message);
    } else {
      console.log("Email sent successfully!");
    }
  });
};

export default mailSender;
