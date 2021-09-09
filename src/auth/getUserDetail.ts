import express from "express";
import {db} from "../admin";
import AuthorisedRequest from "./AuthorisedRequest";

const getUserDetail = async (req: AuthorisedRequest, res: express.Response) => {
    const doc = await db.doc(`/users/${req.user.username}`).get()
    if (doc.exists) {
        return res.json({userCredentials: doc.data()});
    }
}

export default getUserDetail
