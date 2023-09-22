import express, { Express , Request, Response} from 'express';
import { PORT } from './config/server';
import {ProductRouter} from './routes/product.routes';
const app : Express = express();

app.use(express.json());
app.use('/api/proudcts', ProductRouter);
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});