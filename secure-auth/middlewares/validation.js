const { body } = require('express-validator');


const validateMailPassword = () => {
    return [
        body('mail')
            .trim()
            .isEmail().withMessage('Please enter a valid mail'),

        body('password').trim()
            .isLength({ min: 6 }).withMessage('The password should be 6 characters at least')
            .isLength({ max: 20 }).withMessage('Password must be a maximum of 20 characters')
    ];
}


module.exports = {
    validateMailPassword
}