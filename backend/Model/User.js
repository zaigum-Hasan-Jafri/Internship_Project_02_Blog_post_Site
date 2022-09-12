
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required:true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            minlength: 5,
            required: true
        },
        profile: {
            type: String,
            default:""
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
    },{timestamps:true}
)

module.exports = mongoose.model("Users", userSchema)
