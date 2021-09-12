import express from "express";
import {db} from "../admin";
import AuthorisedRequest from "../auth/AuthorisedRequest";
import IProduct from "./IProduct";

const getAllProducts = async (req: AuthorisedRequest, res: express.Response) => {
    const data = await db.collection('products')
        .where('owner', '==', req.user.username)
        .orderBy('createdAt', 'desc')
        .get()

    console.log(`Getting products for: ${req.user.username}`)

    let todos: IProduct[] = [];
    data.forEach((doc) => {
        todos.push({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            owner: doc.data().owner,
            price: doc.data().price,
            color: doc.data().color,
            amount: doc.data().amount,
            createdAt: doc.data().createdAt
        });
    });
    return res.json(todos);
}

export default getAllProducts
