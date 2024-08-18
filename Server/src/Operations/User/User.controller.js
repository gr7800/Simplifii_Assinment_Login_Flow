const UserModel = require("./User.model");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let temporaryStore = {};
const OTP_ATTEMPT_LIMIT = 5;
const LOCKOUT_TIME_MINUTES = 30;

// Set up the email transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Generate a random OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

exports.GetOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .send({ message: `An account already exist with this ${email} email` });
    }

    const otp = generateOTP();
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    };
    console.log(mailOptions);
    // Send OTP via email
    temporaryStore[email] = otp;
    let temp = await transporter.sendMail(mailOptions);
    console.log(temp);
    res.status(200).json({ message: "OTP sent to email successfully", otp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.RegisterController = async (req, res) => {
  const { email, name, mobile, isd, otp } = req.body;
  try {
    // Find user by email
    const user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(404)
        .send({ message: "User already register please login." });
    }

    // Verify OTP
    if (otp !== temporaryStore[email]) {
      return res
        .status(400)
        .send({ message: "Invalid OTP. Please try again." });
    }

    // Create new user if OTP is correct
    const newUser = await UserModel.create({
      name,
      email,
      mobile,
      isd, // Clear OTP after successful registration
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        email: newUser?.email,
        name: newUser?.name,
        _id: newUser?._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7 days" }
    );
    res
      .status(201)
      .send({ user: newUser, message: "User registered successfully!", token });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

exports.LoginController = async (req, res) => {
  const { email, otp } = req.body;
  
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found. Register first!" });
    }

    if (user.lockoutUntil && new Date(user.lockoutUntil) > new Date()) {
      const remainingTime = Math.ceil((new Date(user.lockoutUntil) - new Date()) / 60000); // in minutes
      return res.status(403).send({ message: `You exceeded the maximum attempts. Please try again after ${remainingTime} minutes.` });
    }

    if (otp !== user.otp) {
      user.otpAttempts = (user.otpAttempts || 0) + 1;
      
      if (user.otpAttempts >= OTP_ATTEMPT_LIMIT) {
        user.lockoutUntil = new Date(Date.now() + LOCKOUT_TIME_MINUTES * 60000); // Set lockout time to 30 minutes from now
      }
      
      await user.save();
      return res.status(400).send({ message: "Invalid OTP. Please try again!" });
    }

    // Successful OTP validation
    user.otpAttempts = 0; // Reset attempts after successful login
    user.lockoutUntil = undefined; // Clear lockout time if present
    await user.save();

    const token = jwt.sign(
      {
        email: user.email,
        name: user.name,
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7 days" }
    );

    res.status(201).send({ message: "Login successful!", token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred" });
  }
};
// New function to resend OTP
exports.ResendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    // Find user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found register user first!" });
    }

    const otp = generateOTP();
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your new OTP for verification code is: ${otp}`,
    };

    // Update OTP in the database
    let t=await UserModel.updateOne({ email }, { otp });
    console.log(user,t)
    // Send new OTP via email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent to email successfully!", otp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.singleuser = async (req, res) => {
  const { token } = req.headers;
  console.log(token, "t");

  if (!token) {
    return res.status(403).send({ message: "Unauthorized" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded, "d");

    // Fetch user details using the userId from the decoded token
    const user = await UserModel.findById(decoded._id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Respond with user details
    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: "Invalid token" });
  }
};
