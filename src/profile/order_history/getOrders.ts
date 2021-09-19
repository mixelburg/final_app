import AuthorisedRequest from "../../auth/AuthorisedRequest";
import express from "express";
import {db} from "../../admin";

const getOrders = async (req: AuthorisedRequest, res: express.Response) => {
    const data = await db.collection('orders')
        .where('owner', '==', req.user.username).get();

    const orders = []
    data.forEach(order => {
        orders.push(order.data())
    })

    res.json(orders)
}

export default getOrders
