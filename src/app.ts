import express from 'express';
import 'express-async-errors';
import carRouter from './routes/CarRoute';
import motoRouter from './routes/MotoRoute';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(carRouter);
app.use(motoRouter);
app.use(errorHandler);

export default app;