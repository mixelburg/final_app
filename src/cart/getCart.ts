import express from "express";
import AuthorisedRequest from "../auth/AuthorisedRequest";
import {db} from "../admin";

const getCart = async (req: AuthorisedRequest, res: express.Response) => {
    const doc = await db.doc(`/cart/${req.user.username}`).get()

    res.json(doc.data())
}

export default getCart
