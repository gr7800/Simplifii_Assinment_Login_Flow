const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = async function (req, res, next) {
  const token = req.headers.token;
  console.log(token, "token");

  if (!token) {
    return res.status(403).send("Unauthorized");
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // console.log("err", err, "dec", decoded);
        return res.status(403).json({ message: "Invalid token" });
      }

      // Add the decoded user information to the request object
      req.user = decoded;
      next();
    });
  } catch (e) {
    return res.status(401).send({ message: e.message });
  }
};

module.exports = verifyToken;
