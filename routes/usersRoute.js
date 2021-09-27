const express = require("express");
const router = express.Router();
const user = require("../controller/userController");
const checkAuth = require("../middleware/checkAuth");

router.post("/signup", user.signUp);
router.post("/login", user.login);
router.get("/", user.getAllUser);
router.get("/:id", checkAuth, user.getUserById);
module.exports = router;
