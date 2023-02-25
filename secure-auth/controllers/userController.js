const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');

const registerUser = async (req, res) => {
    try {
        const validationError = validationResult(req);

        if (!validationError.isEmpty()) {
            res.status(400).json(validationError.array());
        } else {
            const usercheck = await User.findOne({ mail: req.body.mail }).select("mail")
            if (!usercheck) {

                const newUser = new User({
                    mail: req.body.mail,
                    password: await bcrypt.hash(req.body.password, 10),
                })

                await newUser.save();

                res.status(200).json({
                    msg: "You have successfully registered"
                });

            } else {
                res.status(400).json({
                    msg: "This email is already in use"
                })
            }
        }


    } catch (error) {

        res.status(400).json({
            msg: "Please enter a valid mail"
        })
    }

};


const loginUser = async (req, res) => {
    try {
        const validationError = validationResult(req);

        if (!validationError.isEmpty()) {
            res.status(400).json(validationError.array());
        } else {
            const user = await User.loginUser(req.body.mail, req.body.password);
            if (user) {

                const token = await user.generateToken();

                res.status(200).json({
                    token,
                    user
                });

            } else {
                res.status(400).json({
                    msg: "Email or password is incorrect"
                })
            }

        }

    } catch (error) {
        res.status(400).json({
            msg: "Email or password is incorrect"
        })
    }

};

const getUser = async (req, res) => {
    try {

        res.status(200).json(req.user);

    } catch (error) {
        res.status(400).json({
            msg: "Error!"
        })
    }

};

module.exports = {
    registerUser,
    loginUser,
    getUser
}