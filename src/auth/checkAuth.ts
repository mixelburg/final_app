import express from "express";
import {admin, db} from "../admin";

const authMW = async (req, res: express.Response, next: express.NextFunction) => {
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1];
        req.user = await admin.auth().verifyIdToken(idToken);
    } else {
        console.error('No token found');
        throw new Error('Unauthorized')
    }

    const data = await db.collection('users')
        .where('id', '==', req.user.uid)
        .limit(1).get();
    req.user.username = data.docs[0].data().username;
    return next();
}

export default authMW
