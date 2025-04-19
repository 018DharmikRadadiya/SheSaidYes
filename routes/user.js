const express = require('express');
const wrapAsync = require('../utils/wrapAsync.js');
const router = express.Router({mergeParams:true});
const passport = require('passport');
const {redirectUrl} = require('../middlewares/listing_middleware.js');

const usersController = require('../controller/users.js');

//Signup
router.route("/signup").get(usersController.renderSignupForm).post(wrapAsync(usersController.signup));

//Login 
router.route("/login").get(usersController.renderLoginForm).post(redirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),usersController.login)

//Logout
router.get("/logout",usersController.logout)

module.exports = router;