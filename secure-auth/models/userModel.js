const mongoose = require("mongoose");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    mail: {
        type: String,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid e-mail',
        ],
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
        minlenght: 10,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        maxlength: 500
    }
}, { timestamps: true });


userSchema.methods.generateToken = function () {
    const loggedUser = this;
    const token = jwt.sign({ _id: loggedUser._id },
        process.env.JWTSECRET, { expiresIn: "3d" });

    return token;

}


userSchema.statics.loginUser = async function (mail, password) {
    const user = await User.findOne({ mail: mail });
    if (!user) {
        throw createError(400, "Mail or password incorrect");

    } else {
        const passwordControl = await bcrypt.compare(password, user.password);
        if (!passwordControl) {
            throw createError(400, "Mail or password incorrect");

        }
    }
    return user;
}


const User = mongoose.model("user", userSchema);

module.exports = User;