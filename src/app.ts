import express from 'express';
import carRouter from './routes/CarRoute';

const app = express();

app.use(express.json());
app.use(carRouter);

export default app;