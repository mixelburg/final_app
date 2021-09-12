import AuthorisedRequest from "../auth/AuthorisedRequest";
import express from "express";
import {db} from "../admin";
import defaultCartData from "./defaultCartData";

const clearCart = async (req: AuthorisedRequest, res: express.Response) => {
    const doc = await db.doc(`/cart/${req.user.username}`)
    await doc.update(defaultCartData)
    res.json({message: '[+] Updated successfully'});
}

export default clearCart
