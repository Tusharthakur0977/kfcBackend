const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter User name"],
    maxLength: [30, "name cannot exceed 30 characters"],
    minLength: [3, "name should minimum have 3 characters"],
  },
  email: {
    type: String,
    required: [true, "please enter a email"],
    unique: true,
    validate: [validator.isEmail, "Enter a valid Email address"],
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minLength: [5, "password should be minimum 5 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
});

//🎈 hashing password
userSchema.pre("save", async function (next) {
  // if password is not modified then skip the hashing step
  // case of profile update
  if (!this.isModified("password")) {
    next();
  }

  // otherwise hash the modified password
  this.password = await bcrypt.hash(this.password, 10); // case of change password
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign(
    { id: this._id },
    "wjknfweurvWRHIWQHIQWR82VEIMVR92rnh2v82hvnhrvo9nh898HQNE",
    {
      expiresIn: 5, // specifing expire time for jwt tken
    }
  );
};

//🎈 compare password for login
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
