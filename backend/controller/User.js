const User = require("../Model/User")
const bcrypt = require("bcrypt");
const Post = require("../Model/Post");

// Update
exports.update = async (req, res) => {
    let value = req.body;
    const user = await User.findById(req.params.id)
    if (user.username === value.username) {
        if (value.password) {
            const saltRound = 10;
            const salt = bcrypt.genSaltSync(saltRound);
            value.password = bcrypt.hashSync(value.password, salt);
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: value }, { new: true });
            res.status(200).json(updateUser)
        }
        catch (err) {
            res.status(404).json(err);
        }
    }
    else {
        res.status(401).json("You are not allowed")
    }
}


// Delete
exports.delete = async (req, res) => {
    let value = req.body;
    const user = await User.findById(req.params.id)
    if (value.username === user.username) {
        
            try {
                await Post.deleteMany({ username: user.username })
                await user.delete()
                res.status(200).json("deleted successfully")
            } catch (error) {
                res.status(456).json(error || "Problem occured in the user delete controllerApi")
            }
        
    }
    else {
        res.status(401).json("User Not Found")
    }

}

// Single
exports.single = async (req, res, next) => {

    try {
        const findUser = await User.findById(req.params.id)
        const { password, ...other } = findUser._doc;
        res.status(200).json(other);
    } catch (error) {
        next(error)
    }
}

// ALl
exports.all = async (req, res, next) => {
    try {
        const Users = await User.find()
        res.status(200).json(Users);
    } catch (error) {
        next(error)
    }
}