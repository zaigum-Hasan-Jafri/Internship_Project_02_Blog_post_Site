const router = require("express").Router();
const User = require("../controller/User");

// Update
router.put('/update/:id',User.update)

// Delete
router.delete('/delete/:id',User.delete)

//Single-User
router.get('/user/:id',User.single)

//All-User
router.get('/all',User.all)

module.exports = router;