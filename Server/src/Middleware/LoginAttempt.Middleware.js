const UserModel = require("../Operations/User/User.model");

const OTP_ATTEMPT_LIMIT = 5;
const LOCKOUT_TIME_MINUTES = 30;

const otpLimitMiddleware = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    if (user.lockoutUntil && new Date(user.lockoutUntil) > new Date()) {
      const remainingTime = Math.ceil((new Date(user.lockoutUntil) - new Date()) / 60000); // in minutes
      return res.status(403).send({
        message: `You exceeded the maximum attempts. Please try again after ${remainingTime} minutes.`,
      });
    }

    // Reset attempts if lockout period has expired
    if (user.lockoutUntil && new Date(user.lockoutUntil) <= new Date()) {
      user.otpAttempts = 1;
      user.lockoutUntil = undefined;
      await user.save();
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred" });
  }
};

module.exports = otpLimitMiddleware;
