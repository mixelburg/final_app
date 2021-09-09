import express from "express";

interface AuthorisedRequest extends express.Request {
    user: {
        username: string;
    }
}

export default AuthorisedRequest
