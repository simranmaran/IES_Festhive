import { generateToken } from "../lib/util.js";
import bcrypt from "bcrypt";
import User from "../model/user.model.js";
import path from "path";

// Signup ----------------------------------------------------------------------------------------------------
export const signup = async (req, res, next) => {
  const { fullName, email, password ,gender,mobile} = req.body;
  console.log(fullName, email, password);
  try {
    console.log(req.body);
    
    if (!fullName || !email || !password ||!gender ||!mobile) {
      return res.status(400).json({ error: "All Fields Required!!!" });
    }

    if (password.length < 8 ||password.length>15) {
      return res.status(400).json({ error: "Password must contain at least 10 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ fullName, email, password: hashedPassword,gender});

    console.log(newUser._id);
    res.status(201).json({ message: `Welcome to SynVilla, ${fullName}!` });
  } catch (error) {
    next(error);
  }
};
  ``

// Login ----------------------------------------------------------------------------------------------------
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All fields required!!!" });
    }

    if (password.length <8) {
      return res.status(400).json({ error: "Password must contain at least 10 characters" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Invalid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    console.log("i am here")
    const { token, userInfo } = generateToken(user, res);
    res.status(200).json({
      success: true,
      message: `Welcome Back, ${user.fullName}!`,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      _id: user.id,
      userInfo
    });
  } catch (error) {
    next(error);
  }
};



// Logout ----------------------------------------------------------------------------------------------------
export const logout = (req, res, next) => {
  try { 
    console.log("user log out")
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "See you soon!" });
  } catch (error) {
    next(error);
  }
};

//userupdate

export const userUpdate = async (req, res, next) => {
  try {
    const { fullName, gender, age, mobile, image } = req.body;
    console.log(fullName, gender, age, mobile, image);
    const userID = req.verifiedUser._id;

    const UpdatedUser = await User.findByIdAndUpdate(
      { _id: userID },
      {
        fullName,
        gender,
        age,
        mobile,
        profilePic: image,
      },
      { new: true }
    );

    res.status(200).json({ message: "User Update Sucessfull", UpdatedUser });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

//reset password

export const userReset = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userID = req.verifiedUser._id;

    const checkpasword = await bcrypt.compare(
      oldPassword,
      req.verifiedUser.password
    );
    if (!checkpasword) {
      const er = new Error("Incorrect Password");
      er.statusCode = 401;
      next(er);
      return;
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    const UpdatedUser = await User.findByIdAndUpdate(
      { _id: userID },
      {
        password: encryptedPassword,
      },
      { new: true }
    );
    res.status(200).json({ message: "Password Changed Sucessfull" });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

//userdelete
export const userDelete = async (req, res, next) => {
  try {
    const userID = req.verifiedUser._id;
    const confimDelete = await User.findByIdAndDelete({ _id: userID });
    res.status(200).json({ message: "User Delete Sucessfull" });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

export const userCheck = (req, res, next) => {
  try {
    const { fullName, email, gender, age, mobile, profilePic } =
      req.verifiedUser;

    res.status(200).json({ fullName, email, gender, age, mobile, profilePic });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
// // Check Authentication ------------------------------------------------------------------------------------
// export const checkAuth = (req, res, next) => {
//   try {
//     res.status(200).json({
//       _id: req.user._id,
//       email: req.user.email,
//       fullName: req.user.fullName,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
};
