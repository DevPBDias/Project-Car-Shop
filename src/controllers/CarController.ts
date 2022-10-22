import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class FrameController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request, res: Response) {
    const car = req.body;
    if (!car) {
      return res.status(400).json({ message: 'Obj empty' });
    }
    const created = await this._service.create(car);
    if (!created) {
      return res.status(400).json({ message: 'Obj null' });
    }
    return res.status(201).json(created);
  }

  public async read(_req: Request, res: Response) {
    const result = await this._service.read();
    return res.status(200).json(result);
  }

  public async readOne(req: Request, res: Response) {
    const result = await this._service.readOne(req.params.id);
    return res.status(201).json(result);
  }

  public async update(req: Request, res: Response) {
    const updated = await this._service.update(req.params.id, req.body);
    return res.status(201).json(updated);
  }

  public async delete(req: Request, res: Response) {
    const result = await this._service.delete(req.params.id);
    return res.status(201).json(result);
  }
}