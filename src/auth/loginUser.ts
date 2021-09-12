import express from "express";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Joi from "joi";
const auth = getAuth();


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

const loginUser = async (req: any, res: express.Response) => {
    const result = loginSchema.validate(req.body)

    if (result.error) {
        throw result.error
    }

    const data = await signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    const token = await data.user.getIdToken()
    res.json({ token })
}

export default loginUser


