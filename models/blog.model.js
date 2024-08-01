const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

const Blog = model("blogs", blogSchema);

module.exports = {
    Blog,
}