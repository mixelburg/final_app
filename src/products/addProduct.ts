import {admin, db} from "../admin";
import express from "express";
import IProduct, {ProductRequest} from "./IProduct";
import AuthorisedRequest from "../auth/AuthorisedRequest";


const addProduct = async (req: ProductRequest & AuthorisedRequest, res: express.Response) => {
    console.log(req.body)

    const data: IProduct = {
        name: req.body.name,
        description: req.body.description,
        owner: req.user.username,
        price: req.body.price,
        color: req.body.color,
        amount: req.body.amount,
        createdAt: admin.firestore.Timestamp.fromDate(new Date())
    }

    const createdProduct = await db.collection('products').add(data)
    console.log(`[+] Successfully created new product: ${createdProduct.id}`)
    data.id = createdProduct.id;
    return res.json(data);
}
export default addProduct
