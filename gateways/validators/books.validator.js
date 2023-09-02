import joi from 'joi';

const schema = joi.object ({
    title: joi.string()
        .required(),

    author: joi.string()
        .required(),

    release: joi.number()
        .integer()
        .required()
}) 

export function validateBook(req, res, next) {
    const { error } = schema.validate(req.body)

    if (error) {
        res.status(422).json({ error: error.details })
    } else {
        next()
    }
}