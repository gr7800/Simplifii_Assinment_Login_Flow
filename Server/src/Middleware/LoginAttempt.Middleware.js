const UserModel = require("../Operations/User/User.model");

const OTP_ATTEMPT_LIMIT = 5;
const LOCKOUT_TIME_MINUTES = 30;

const otpLimitMiddleware = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    if (user.lockoutUntil && user.lockoutUntil > new Date()) {
      const remainingTime = Math.ceil((user.lockoutUntil - new Date()) / 60000); // in minutes
      return res
        .status(403)
        .send({
          message: `You exceeded the maximum attempts. Please try again after ${remainingTime} minutes.`,
        });
    }

    if (user.otpAttempts >= OTP_ATTEMPT_LIMIT) {
      user.lockoutUntil = new Date(Date.now() + LOCKOUT_TIME_MINUTES * 60000); // 30 minutes lockout
      user.otpAttempts = 0; // reset attempts
      await user.save();
      return res
        .status(403)
        .send({
          message: `You exceeded the maximum attempts. Please try again after 30 minutes.`,
        });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred" });
  }
};

module.exports = otpLimitMiddleware;
