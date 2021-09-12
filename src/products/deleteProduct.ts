import AuthorisedRequest from "../auth/AuthorisedRequest";
import express from "express";
import {db} from "../admin";

const deleteProduct = async (req: AuthorisedRequest, res: express.Response) => {
    const doc = db.doc(`/todos/${req.params.id}`);
    const snapshot = await doc.get()
    if (!snapshot.exists)
        throw new Error("todo not found")

    if(snapshot.data().author !== req.user.username)
        throw new Error('[!] Unauthorised')

    await doc.delete()
    res.json({message: "[+] Delete successful"})
}

export default deleteProduct
