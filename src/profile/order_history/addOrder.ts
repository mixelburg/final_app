import AuthorisedRequest from "../../auth/AuthorisedRequest";
import express from "express";
import {admin, db} from "../../admin";
import IProduct from "../../products/IProduct";
import {firestore} from "firebase-admin";
import Timestamp = firestore.Timestamp;

interface IOrder {
    id?: string;
    items: IProduct[];
    total: number;
    date: Timestamp;
    owner: string;
}

const addOrder = async (req: AuthorisedRequest, res: express.Response) => {
    const cart = await db.doc(`/cart/${req.user.username}`).get()

    if (cart.data().total === 0)
        throw new Error("cart is empty")

    const order: IOrder = {
        items: cart.data().items,
        total: cart.data().total,
        date: admin.firestore.Timestamp.fromDate(new Date()),
        owner: req.user.username
    }

    const createdOrder = await db.collection('orders').add(order)
    console.log(`[+] Successfully created new order: ${createdOrder.id}`)
    order.id = createdOrder.id;
    return res.json(order);
}

export default addOrder
