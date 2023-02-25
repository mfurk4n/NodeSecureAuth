const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMw = require("../middlewares/auth");
const validatorMw = require('../middlewares/validation');

router.post('/register', validatorMw.validateMailPassword(), userController.registerUser);

router.post('/login', validatorMw.validateMailPassword(), userController.loginUser);

router.get('/getuser', authMw, userController.getUser);

module.exports = router;