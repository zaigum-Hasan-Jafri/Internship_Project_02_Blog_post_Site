const router = require("express").Router();
const Category = require("../controller/Category");

//Create
router.post('/create',Category.create)

//All-Category
router.get('/all',Category.all)

module.exports = router;