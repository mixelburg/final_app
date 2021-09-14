import express from "express";
import {db} from "../admin";
import Joi from "joi";


const addToCartSchema = Joi.object({
    id: Joi.string().required(),
    color: Joi.string().required(),
    amount: Joi.number().min(1).required()
})

const addToCart = async (req: any, res: express.Response) => {
    const result = addToCartSchema.validate(req.body)

    if (result.error) {
        throw result.error
    }

    const product = await db.doc(`/products/${req.body.id}`).get()
    if (!product.exists)
        throw new Error("[!] Product not found")

    const doc = await db.doc(`/cart/${req.user.username}`)
    const snapshot = await doc.get()

    let data = snapshot.data()

    const index = data.items.findIndex(item => item.id === req.body.id && item.color === req.body.color)
    if (index !== -1) {
        data.items[index].amount += req.body.amount
    } else {
        data.items.push({
            ...req.body,
            name: product.data().name,
            price: product.data().price
        })
    }
    data.total += req.body.amount * product.data().price

    console.log(data.items)
    await doc.update(data)
    res.json({message: '[+] Updated successfully'});
}

export default addToCart
