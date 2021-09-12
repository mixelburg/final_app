import {firestore} from "firebase-admin";

export default interface IProduct {
    id?: string;
    name: string;
    description: string;
    owner: string;
    price: number;
    color: string[];
    amount: string[];
    createdAt: Timestamp;
}

import * as Joi from 'joi'
import {
    ContainerTypes,
    // Extend from this to define a valid schema type/interface
    ValidatedRequestSchema,
    // Creates a validator that generates middlewares
    createValidator
} from 'express-joi-validation'
import Timestamp = firestore.Timestamp;

const validator = createValidator()

const ProductSchema = Joi.object({
    name: Joi.string().alphanum().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required(),
    color: Joi.array().items(Joi.string()).min(1).required(),
    amount: Joi.array().items(Joi.number()).min(1).required()
})

interface ProductRequest extends ValidatedRequestSchema {
    [ContainerTypes.Body]: IProduct
}

export {ProductRequest, ProductSchema, validator}

