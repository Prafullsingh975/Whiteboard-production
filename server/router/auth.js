const express = require("express");
const router = express.Router();
const passport = require("../middleware/googleOauth.js");
const { isLogin, logout, jwtRegister, jwtLogin } = require("../controller/auth.js");

// Google Oauth
router.get(
  "/google",
  passport.authenticate("google")
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/signin",
    successRedirect: "http://localhost:5173/room",
  })
);

router.get('/is-login',isLogin);

router.get('/logout',logout)

// JWT 

router.post("/signup",jwtRegister);
router.post("/login",jwtLogin);

module.exports = router;
