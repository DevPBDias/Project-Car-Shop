import { IService } from '../interfaces/IService';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';

class CarService implements IService<ICar> {
  private _car:IModel<ICar>;

  constructor(model:IModel<ICar>) {
    this._car = model;
  }

  public async create(obj:unknown):Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(parsed.data);
  }

  public async read(): Promise<ICar[]> {
    return this._car.read();
  }
  
  public async readOne(_id:string):Promise<ICar> {
    const result = await this._car.readOne(_id);
    if (!result) throw new Error('Error service');
    return result;
  }
    
  public async update(_id: string, obj: unknown): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
        
    if (!parsed.success) {
      throw parsed.error;
    }
        
    const updated = await this._car.update(_id, parsed.data);
        
    if (!updated) {
      throw new Error('Error service');
    }
        
    return updated;
  }
    
  public async delete(_id: string): Promise<ICar> {
    const document = await this._car.delete(_id);
    if (!document) throw new Error('Error service delete');
    return document;
  }
}

export default CarService;