import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { clerkMiddleware } from "@clerk/express";

import  meRouter  from "./routes/meRouter";
import productRouter from "./routes/productRouter";
import adminRouter from "./routes/adminRouter";
import orderRouter from "./routes/orderRouter";


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());
 
app.use("/api/me", meRouter);
app.use("/api/products", productRouter);
app.use("/api/admin", adminRouter);
app.use("/api/order", orderRouter);

app.post("/webhooks/", (req, res) => {
    void clerkWebhookHandler(res, req)
})

function clerkWebhookHandler(res: express.Response, _req: express.Request) {
    res.status(200).send("ok")
}

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})