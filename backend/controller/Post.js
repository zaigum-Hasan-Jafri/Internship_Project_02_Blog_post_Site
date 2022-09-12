const User = require("../Model/User")
// const bcrypt = require("bcrypt");
const Post = require("../Model/Post");

//create
exports.create = async (req, res, next) => {
    const newPost = new Post(req.body)
    try {
        const savePost = await newPost.save()
        res.status(200).json(savePost)
    } catch (error) {
        next(error)
    }
}

//update
exports.update = async (req, res) => {
    try {
        let value = req.body;
        const post = await Post.findById(req.params.id)
        if (post.username === value.username) {
            try {
                const updatePost = await Post.findByIdAndUpdate(req.params.id, { $set: value }, { new: true });
                res.status(200).json(updatePost)
            }
            catch (err) {
                res.status(404).json(err);
            }
        }
        else {
            res.status(401).json("You are only allowed for your posts")
        }
    } catch (error) {
        res.status(400), json(error.message)
    }
}


//delete
exports.delete = async (req, res) => {
    try {
        let value = req.body;
        const post = await Post.findById(req.params.id)
        if (post.username === value.username) {
            try {
                await post.delete()
                res.status(200).json("Deleted Successfully")
            }
            catch (err) {
                res.status(404).json(err);
            }
        }
        else {
            res.status(401).json("You are only allowed for your account")
        }
    } catch (error) {
        res.status(400), json(error.message)
    }

}

//get-single
exports.single = async (req, res, next) => {

    try {
        const findPost = await Post.findById(req.params.id)
        res.status(200).json(findPost);
    } catch (error) {
        next(error.message);
    }
}

//find-all
exports.all = async (req, res, next) => {
    const username = req.query.user
    const Category = req.query.category
    try {
        let posts;
        if(username){
            posts = await Post.find({username})
        }
        else if (Category){
            posts = await Post.find({categories:{
                $in:[Category]
            }})
        }
        else{

            posts = await Post.find()
        }
        res.status(200).json(posts);
    } catch (error) {
        next(error.message)
    }
}