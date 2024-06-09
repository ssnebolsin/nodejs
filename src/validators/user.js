const Joi = require('joi');


function userValidator(req, res, next) {

    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        password: Joi.string().min(2).required(),
    })

    const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: false })

    if (error) {
        return res.status(422).json(error.details.map(itm => {
            return {
                error: itm.message,
                path: itm.path,
            }
        }))

    }

    next()
}


module.exports = {
    userValidator
}