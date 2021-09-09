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

const app = express();
const port = 5000;

app.use(express.json())
app.use(cors())


app.post("/products", validator.body(ProductSchema) ,ash(addProduct))


app.post("/login", ash(loginUser))
app.post("/signup", ash(signupUser))
app.get("/user", ash(checkAuth), ash(getUserDetail))

app.use(ErrorHandler)

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});

