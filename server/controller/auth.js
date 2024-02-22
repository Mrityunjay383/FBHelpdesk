const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../model/user");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!(name && email && password)) {
      res
        .status(404)
        .json({ success: false, errorMessage: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(401).json({
        success: false,
        errorMessage: "User already exist, please Login",
      });
    }

    const encPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: encPassword,
    });

    //token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    user.password = undefined;

    res.status(201).json({ success: true, token });
  } catch (e) {
    console.log(e);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res
        .status(404)
        .json({ success: false, errorMessage: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      //token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.password = undefined;

      return res.status(200).json({
        success: true,
        token,
      });
    }

    res
      .status(400)
      .json({ success: false, errorMessage: "Email or password incorrect" });
  } catch (e) {
    console.log(e);
  }
};
