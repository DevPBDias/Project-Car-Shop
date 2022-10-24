import { Router } from 'express';
import MotoController from '../controllers/MotoController';
import MotoModel from '../models/MotoModel';
import MotoService from '../services/MotoService';

const route = Router();

const model = new MotoModel();
const service = new MotoService(model);
const controller = new MotoController(service);

const routeWithId = '/motorcycles/:id';

route.post('/motorcycles', (req, res) => controller.create(req, res));
route.get('/motorcycles', (req, res) => controller.read(req, res));
route.get(routeWithId, (req, res) => controller.readOne(req, res));
route.put(routeWithId, (req, res) => controller.update(req, res));
route.delete(routeWithId, (req, res) => controller.delete(req, res));

export default route;
