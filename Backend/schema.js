const joi = require('joi');

const UserSchema = joi.object({
    username : Joi.string().alphanum().min(3).max(30).required().email(),
    password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    firstName : Joi.string().required(),
    lastName : Joi.string()
})

module.exports = {UserSchema};