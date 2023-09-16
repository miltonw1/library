import joi from 'joi';

const schema = joi.object ({
    name: joi.string()
        .required(),
    
    last_name: joi.string()
        .required()
})

export function validateUser(req, res, next) {
    const { error } = schema.validate(req.body)

    if (error) {
        res.status(422).json({ error: error.details })
    } else {
        next()
    }

}