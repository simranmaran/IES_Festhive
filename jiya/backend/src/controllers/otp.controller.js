import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import OTP from "../model/otp.model.js";
import nodemailer from "nodemailer";

const SECRET_KEY = "himl digk dzre nsun"; // Change this
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shahanashah9630@gmail.com",
    pass: "himldigkdzrensun",
  },
  tls: {
    rejectUnauthorized: false, //  SSL Certificate Error Ko Bypass Karne Ke Liye
  },
});

// ➤ User Signup
export const signup = async (req, res) => {
    try {
      const { fullName, email, password, gender, profilePic } = req.body;
      let user = await User.findOne({ email });
  
      if (user) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({
        fullName,
        email,
        password: hashedPassword,
        gender,
        profilePic: profilePic || "",
      });
  
      await user.save();
      res.status(201).json({ message: "Signup successful" });
  
    } catch (error) {
      res.status(500).json({ message: "Error signing up" });
    }
  };
  
// ➤ User Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ token, message: "Login successful" });

  } catch (error) {
    res.status(500).json({ message: "Login error" });
  }
};

// ➤ Forgot Password (Send OTP)
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    console.log("Generated OTP:", otp);

    // OTP ka expiry time (5 minutes set kiya hai)
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);

    // OTP Store in Database (Agar Pehle Se Hai, Toh Replace Kar Do)
    await OTP.findOneAndUpdate(
      { email },
      { otp, expiresAt: otpExpiry },
      { upsert: true, new: true }
    );

    // Nodemailer Email Send
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // SSL Issue Fix
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
    };

    console.log("Sending email to:", email);
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent to email" });

  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // OTP Record Fetch Karo
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP Expiry Check Karo
    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    res.status(200).json({ message: "OTP verified successfully" });

  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Error verifying OTP" });
  }
};


// ➤ Reset Password
// export const resetPassword = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;
//     const otpRecord = await OTP.findOne({ email, otp });

//     if (!otpRecord || otpRecord.expiresAt < new Date()) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     await User.findOneAndUpdate({ email }, { password: hashedPassword });

//     await OTP.deleteOne({ email, otp });

//     res.status(200).json({ message: "Password reset successful" });

//   } catch (error) {
//     res.status(500).json({ message: "Error resetting password" });
//   }
// };


export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    console.log(`Reset Password Request: Email=${email}, NewPassword=${newPassword}`);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    res.status(200).json({ message: "Password reset successful" });

  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Error resetting password" });
  }
};
