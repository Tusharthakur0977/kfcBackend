const mongoose = require("mongoose");
const validator = require("validator");

const franchiseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter User name"],
  },
  email: {
    type: String,
    required: [true, "please enter a email"],
    unique: true,
    validate: [validator.isEmail, "Enter a valid Email address"],
  },
  phone: {
    type: String,
    required: [true, "please enter phone number"],
  },
  state: {
    type: String,
    required: [true, "please enter a state"],
  },
  city: {
    type: String,
    required: [true, "please enter a city"],
  },
  pincode: {
    type: String,
    required: [true, "please enter a pincode"],
  },
  currentBusiness: {
    type: String,
    default: "0",
  },
  investmentPlan: {
    type: String,
    defualt: "0",
  },
  messsage: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("franchise", franchiseSchema);
