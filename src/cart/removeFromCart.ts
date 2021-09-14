import express from "express";
import {db} from "../admin";
import Joi from "joi";

const removeFromCartSchema = Joi.object({
    id: Joi.string().required(),
    color: Joi.string().required(),
    amount: Joi.number().required()
})

const removeFromCart = async (req: any, res: express.Response) => {
    console.log("REMOVING ITEM")

    const result = removeFromCartSchema.validate(req.body)

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
        if (req.body.amount > data.items[index].amount) {
            data.items[index].amount = 0
        }
        else {
            data.items[index].amount -= req.body.amount
        }
        data.total -= req.body.amount * product.data().price
        if (data.items[index].amount === 0) {
            data.items.splice(index, 1)
        }
    }

    await doc.update(data)
    res.json({message: '[+] Updated successfully'});
}

export default removeFromCart
