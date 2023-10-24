import Joi from "joi";

const loginValidator = Joi.object({
    username: Joi.string()
        .max(150)
        .min(1)
        .required()
        .messages({
            'string.min': 'Мінімум 1 символ',
            'string.max': 'Максимум 150 символів',
            'any.required': 'Поле username є обов\'язковим',
        }),
    password: Joi.string()
        .max(128)
        .min(1)
        .required()
        .messages({
            'string.min': 'Мінімум 1 символ',
            'string.max': 'Максимум 128 символів',
            'any.required': 'Поле password є обов\'язковим',
        }),
});

export {
    loginValidator
}
