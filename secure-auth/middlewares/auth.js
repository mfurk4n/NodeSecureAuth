const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


const authMw = async (req, res, next) => {
    try {
        if (req.header("Authorization")) {

            const token = req.header("Authorization").replace("Bearer ", "");
            const result = jwt.verify(token, process.env.JWTSECRET);

            req.user = await User.findById({ _id: result._id });


        } else {
            throw new Error();
        }


        next();
    } catch (error) {

        res.status(401).json({
            msg: "Please login again"
        })

    }

}


module.exports = authMw;