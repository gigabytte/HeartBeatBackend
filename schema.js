const Joi = require('joi');

const secrete_schema = Joi.object({
    secrete: Joi.string().min(3).required()
});

module.exports = {secrete_schema}