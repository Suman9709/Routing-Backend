const { Schema, model, default: mongoose } = require("mongoose");

//schema is used to give structure of
const blogSchema = new mongoose.Schema({
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
        default: Date.now(),
    },
    auhtor:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"auhtor",

    },

})

const Blog = model("blogs", blogSchema);

module.exports = {
    Blog,
}