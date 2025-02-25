const express = require('express');
const {adminMiddleware, authMiddleware} = require('../middleware/authMiddleware.js');
const { createUser, loginUser, getAllUsers, getUser, googleCallback} = require('../controller/userController.js');
const passport = require("passport");

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);

router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}));
router.get("/google/callback", passport.authenticate("google", {failureRedirect: "/login"}), googleCallback);

router.get('/all', adminMiddleware, getAllUsers);
router.get('/', authMiddleware, getUser);




module.exports = router;
