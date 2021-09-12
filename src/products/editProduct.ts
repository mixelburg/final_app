import {ProductRequest} from "./IProduct";
import express from "express";
import {db} from "../admin";

const editProduct = async (req: ProductRequest, res: express.Response) => {
    let document = db.collection('todos').doc(`${req.params.id}`);
    await document.update(req.body)
    res.json({message: 'Updated successfully'});
}

export default editProduct
