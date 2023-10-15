const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
  registerFranchise,
  getAllFRnchise,
} = require("../controllers/userController");

// 📌 to create a new User 📌
router.post("/register", registerUser);

// 📌 to create a new Franchise 📌
router.post("/register/franchise", registerFranchise);

// 📌 for login 📌
router.post("/admin/login", loginUser);

// 📌 for logout the user 📌
router.get("/logout", logout);

// 📌 for getting All users (ADMIN)  📌
router.get("/allfrnachises", getAllFRnchise);

// 📌 for getting Single user (ADMIN)  📌
router.get("/admin/getSingleUser/:id", getSingleUser);

// 📌 for Updating User Details (ADMIN)  📌
router.put("/admin/updateUserRole/:id", updateUserRole);

// 📌 for Deleting User (ADMIN)  📌
router.delete("/admin/deleteUser/:id", deleteUser);

module.exports = router;
