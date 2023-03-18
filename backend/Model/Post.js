//post-Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        username: {
            type: String,
            required:true
        },
        title: {
            type: String,
            required:true,
            unique: true
        },
        desc: {
            type: String,
            required: true,
        },
        photo: {
            type: String, 
            required: false
        },
        categories: {
            type: Array,
            default: []
        },
    },{timestamps:true}
)

module.exports = mongoose.model("Posts", postSchema)
