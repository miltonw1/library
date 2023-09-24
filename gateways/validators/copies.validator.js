import joi from 'joi';

const schema = joi.object({
    book_id: joi.number().required(),
    internal_id: joi.number().required(),
})

export function validateCopy(req, res, next) {
    const { error } = schema.validate(req.body)

    if (error) {
        res.status(422).json({ error: error.details })
    } else {
        next()
    }
}