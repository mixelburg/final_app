import express from 'express';
import cors from 'cors'

import { initializeApp } from 'firebase/app';
import firebaseConfig from "./secret/firebaseConfig";
initializeApp(firebaseConfig);

import ErrorHandler from "./ErrorHandler";
import ash from "./ash";
import {ProductSchema, validator} from "./products/IProduct";
import addProduct from "./products/addProduct";
import loginUser from "./auth/loginUser";
import signupUser from "./auth/signupUser";
import checkAuth from "./auth/checkAuth";
import getUserDetail from "./auth/getUserDetail";
import deleteProduct from "./products/deleteProduct";
import editProduct from "./products/editProduct";
import getAllProducts from "./products/getAllProducts";
import addToCart from "./cart/addToCart";
import getCart from "./cart/getCart";
import getProductById from "./products/getProductById";
import removeFromCart from "./cart/removeFromCart";
import clearCart from "./cart/clearCart";

const app = express();
const port = 11111;

app.use(cors())
app.use(express.json())


app.post("/products", ash(checkAuth), validator.body(ProductSchema) ,ash(addProduct))
app.delete("/products/:id", ash(checkAuth), ash(deleteProduct))
app.put("/products/:id", ash(checkAuth), validator.body(ProductSchema), ash(editProduct))
app.get("/products", ash(checkAuth), ash(getAllProducts))
app.get("/products/:id", ash(checkAuth), ash(getProductById))

app.post("/cart", ash(checkAuth), ash(addToCart))
app.get("/cart", ash(checkAuth), ash(getCart))
app.put("/cart", ash(checkAuth), ash(removeFromCart))
app.delete("/cart", ash(checkAuth), ash(clearCart))

app.post("/login", ash(loginUser))
app.post("/signup", ash(signupUser))
app.get("/user", ash(checkAuth), ash(getUserDetail))

app.use(ErrorHandler)

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});

