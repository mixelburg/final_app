import express from "express";

const ErrorHandler = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack)

    res.status(500).json({
        err: err.message
    })
}

export default ErrorHandler
