// Require the Mongoose library.
const mongoose = require("mongoose");

// Define the user schema with fields for full name, user name, email, password, and avatar.
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    mobile: {
      type: String,
      required: true
    },
    isd: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      default: "1234"
    }
  },
  // Set options for the schema.
  {
    // Set versionKey to false to exclude __v field in response.
    versionKey: false,
    // Set timestamps to true to automatically add createdAt and updatedAt fields.
    timestamps: true,
  }
);

// Create a User model using the userSchema.
const User = mongoose.model("User", userSchema);

// Export the User model.
module.exports = User;