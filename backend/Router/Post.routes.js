const router = require("express").Router()
const Post = require("../controller/Post")

//Create
router.post('/create',Post.create)

// Update
router.put('/update/:id',Post.update)

// Delete
router.delete('/delete/:id',Post.delete);

//Single-Post
router.get('/post/:id',Post.single);

//All-Post
router.get('/all',Post.all);

module.exports = router;