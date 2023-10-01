import express, { Request,Response,Express } from "express";
import {PORT} from "./config/server.config";
import {OrderRouter} from "./routes/order.route";
const app:Express  = express();
app.use(express.json());
app.use('/api/orders', OrderRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
