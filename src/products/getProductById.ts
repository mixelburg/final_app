import AuthorisedRequest from "../auth/AuthorisedRequest";
import express from "express";
import {db} from "../admin";

const getProductById = async (req: AuthorisedRequest, res: express.Response) => {
    const doc = await db.doc(`/products/${req.params.id}`).get()
    let productData = doc.data();
    productData.todoId = doc.id;
    return res.json(productData);
}

export default getProductById
