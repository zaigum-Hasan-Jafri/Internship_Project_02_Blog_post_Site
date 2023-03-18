
const User = require("../Model/User")
const bcrypt = require("bcrypt");

// create
exports.register = async (req, res, next) => {
    const value = req.body;
        const saltRound = 10;
        const salt = bcrypt.genSaltSync(saltRound);
        const hash = bcrypt.hashSync(value.password, salt);
    const newUser = new User({
        username: value.username,
        email: value.email,
        password: hash,
    });
    try {
        const saveUser = await newUser.save()
        res.status(201).json(saveUser);
    } catch (error) {
        res.status(500).json({message:"somethimg went wrong in registeration"})
    }
}

// Find(validate)
exports.login = async (req, res, next) => {
        let value = req.body;
        const user = await User.findOne({ username: value.username })
        try {
            if (!user) {
                return res.status(400).json({message:"User Not Match"})
            }
            const ispasswordCorrect = await bcrypt.compare(value.password, user.password)
            if (!ispasswordCorrect) {

                return res.status(400||404).json({message:"Password Not Match"});
            }
            const { password, isAdmin,...otherdata } = user._doc
            res.status(200).json(otherdata);
        } catch (error) {
            next(error);
        }
}

