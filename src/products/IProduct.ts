export default interface IProduct {
    id?: string;
    name: string;
    description: string;
    owner: string;
    price: number;
    color: string[];
    amount: string[];
}

import * as Joi from 'joi'
import {
    ContainerTypes,
    // Use this as a replacement for express.Request
    ValidatedRequest,
    // Extend from this to define a valid schema type/interface
    ValidatedRequestSchema,
    // Creates a validator that generates middlewares
    createValidator
} from 'express-joi-validation'

const validator = createValidator()

const ProductSchema = Joi.object({
    name: Joi.string().alphanum().required(),
    description: Joi.string().required(),
    owner: Joi.string().required(),
    price: Joi.number().min(0).required(),
    color: Joi.array().items(Joi.string()).min(1).required()
})

interface ProductRequest extends ValidatedRequestSchema {
    [ContainerTypes.Body]: IProduct
}

export {ProductRequest, ProductSchema, validator}

