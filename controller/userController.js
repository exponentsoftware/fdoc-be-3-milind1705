const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports.signUp = (req, res) => {
  const { username, email, mobile, password, role } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({
        message: "this user already register with us",
      });
    }
    //Generating hash password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;

        const newUser = new User({
          username: username,
          email: email,
          mobile: mobile,
          role: role,
          password: hash,
        });
        newUser
          .save()
          .then((data) => {
            return res.status(200).json({
              error: null,
              data: data,
              message: "user saved successfully successfully",
            });
          })
          .catch((err) => {
            return res.status(400).json({
              error: err,
              data: null,
              message: "Something went wrong while fetching data",
            });
          });
      });
    });
  });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(400).json({
        message: "User is not registered with us, Please Signup",
      });
    }
    //     //password validation
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json("Incrrect Password");
      }
      jwt.sign(
        { _id: user.id },
        "JWTSECRETE",
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({
            error: null,
            token: token,
            user: { name: user.username, email: user.email, id: user.id },
          });
        }
      );
    });
  });
};

module.exports.getAllUser = (req, res) => {
  User.find()
    .then((user) => {
      return res.status(200).json({
        data: user,
        error: null,
        message: "data fetch successfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        data: null,
        error: err,
        message: "Canot fetch all data",
      });
    });
};

module.exports.getUserById = (req, res) => {
  User.find({ _id: req.params.id })
    .populate("todo")
    .then((user) => {
      return res.status(200).json({
        data: user,
        error: null,
        message: "data fetch successfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        data: null,
        error: err,
        message: "Canot fetch all data",
      });
    });
};
