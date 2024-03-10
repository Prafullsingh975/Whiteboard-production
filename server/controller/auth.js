const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const isLogin = (req, res) => {
  try {
    if (!req.user) return res.status(403).json({ message: "Not Login" });
    return res.status(200).json({ message: "Login", data: req.user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in is login route", error });
  }
};

const logout = (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) return next(err);
      res.redirect("http://localhost:5173/signin");
    });
    // return res.status(200).json({message:"Logout Successfully",success:true})
  } catch (error) {
    return res.status(500).json({ message: "Error in logout", error });
  }
};

const jwtRegister = async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({ email, displayName, password: hash });

    const token = await jwt.sign({ id: newUser._id },process.env.JWT_SECRET);

    res
      .status(201)
      .json({ token, email, displayName, dp: newUser.dp, _id: newUser._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in jwt registration", error });
  }
};

const jwtLogin = async (req, res) => {
  try {
    const {email,password} = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(403).json({message:"Invalid credentials"});

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(403).json({message:"Invalid credentials"})

    const token = await jwt.sign({ id: user._id },process.env.JWT_SECRET);
    res
      .status(201)
      .json({ token, email, displayName:user.displayName, dp: user.dp, _id: user._id });

  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Error in jwt login",error});
  }
};

module.exports = { isLogin, logout, jwtRegister, jwtLogin };
