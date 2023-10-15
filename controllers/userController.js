const User = require("../models/userModel");
const Franchise = require("../models/franchiseModel");
const sendToken = require("../util/JWTtoken");

//📌 Register a User 📌
exports.registerUser = async (req, res) => {
  console.log("HELLO");
  try {
    const { name, email, password } = req.body;
    console.log(name, email);
    const user = await User.create({
      name,
      email,
      password,
    });

    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//📌 Register a Franchise 📌
exports.registerFranchise = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      state,
      city,
      pincode,
      currentBusiness,
      investmentPlan,
      message,
    } = req.body;

    const user = await Franchise.create({
      name,
      email,
      phone,
      state,
      city,
      pincode,
      currentBusiness,
      investmentPlan,
      message,
    });
    res.status(200).json({
      success: true,
      message: "Franchise Added Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//📌 Login USER 📌
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Enter Email & Password",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//📌 LOgout User 📌
exports.logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "User Logout Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//📌 Get all users(admin) 📌
exports.getAllFRnchise = async (req, res) => {
  try {
    const frnachises = await Franchise.find();
    console.log(frnachises);
    res.status(200).json({
      success: true,
      frnachises,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//📌 Get single user (ADMIN) 📌
exports.getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: `User does not exist with Id: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

//📌 update User DEtails including Role (ADMIn) 📌
exports.updateUserRole = async (req, res, next) => {
  try {
    const updatedUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    await User.findByIdAdUpdate(req.params.id, updatedUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//📌 Delete User (ADMIn)  📌
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: `User does not exist with Id: ${req.params.id}`,
      });
    }

    await user.remove();

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
