import { Router } from 'express';
import CarController from '../controllers/CarController';
import CarModel from '../models/CarModel';
import CarService from '../services/CarService';

const route = Router();

const model = new CarModel();
const service = new CarService(model);
const controller = new CarController(service);

route.post('/cars', (req, res) => controller.create(req, res));
route.get('/cars', (req, res) => controller.read(req, res));
route.get('/cars/:id', (req, res) => controller.readOne(req, res));
route.put('/cars/:id', (req, res) => controller.update(req, res));
route.delete('/cars/:id', (req, res) => controller.delete(req, res));

export default route;
