import express from "express";
import {admin, db} from "../admin";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Joi from "joi";
const auth = getAuth();


const signupSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required().label("password"),
    confirmPassword: Joi.any().equal(Joi.ref("password")).required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match' })
})

const signupUser = async (req: any, res: express.Response) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        username: req.body.username
    };

    const result = signupSchema.validate(req.body)

    if (result.error) {
        throw result.error
    }

    const doc = await db.doc(`/users/${newUser.username}`).get()
    if (doc.exists)
        throw new Error('[!] this username is already taken')

    const data = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
    const userId = data.user.uid
    const token = await data.user.getIdToken()

    const userCredentials = {
        username: newUser.username,
        email: newUser.email,
        createdAt: admin.firestore.Timestamp.fromDate(new Date()),
        id: userId
    };

    await db.doc(`/users/${newUser.username}`).set(userCredentials);

    console.log(`[+] Created new user ${JSON.stringify(userCredentials, null, 4)}`)
    res.status(201).json({token})
}

export default signupUser
