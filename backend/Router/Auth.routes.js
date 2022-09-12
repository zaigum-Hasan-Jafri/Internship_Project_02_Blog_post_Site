const router = require("express").Router();
const Auth = require("../controller/Auth");

// Register
router.post('/register',Auth.register)

// Login
router.post('/login',Auth.login)

module.exports = router;