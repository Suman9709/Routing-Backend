const { Schema, model, default: mongoose  } = require("mongoose")
const bcrypt = require("bcrypt")

const authorSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true,
    },
})
authorSchema.pre('save', async function(next){
this.password = await bc.rypt.hash(this.password, 10)
next();
})

authorSchema.methods.comparePassword = function (password){
    return bcrypt.compare(password, this.password);
}
const Auhtor = model("author", authorSchema);
module.exports = {Auhtor};