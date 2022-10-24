import { IService } from '../interfaces/IService';
import { IMotorcycle, MotoZodSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/CatalogErrors';

class MotoService implements IService<IMotorcycle> {
  private _motorcycle:IModel<IMotorcycle>;

  constructor(model:IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async create(obj:unknown):Promise<IMotorcycle> {
    const parsed = MotoZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._motorcycle.create(parsed.data);
  }

  public async read(): Promise<IMotorcycle[]> {
    const cars = await this._motorcycle.read();
    return cars;
  }
  
  public async readOne(_id:string):Promise<IMotorcycle> {
    const result = await this._motorcycle.readOne(_id);
    if (!result) throw new Error(ErrorTypes.ObjectNotFound);
    return result;
  }
    
  public async update(_id: string, obj: unknown): Promise<IMotorcycle> {
    const parsed = MotoZodSchema.safeParse(obj);
        
    if (!parsed.success) {
      throw parsed.error;
    }
        
    const updated = await this._motorcycle.update(_id, parsed.data);
        
    if (!updated) {
      throw new Error(ErrorTypes.ObjectNotFound);
    }
        
    return updated;
  }
    
  public async delete(_id: string): Promise<IMotorcycle> {
    const document = await this._motorcycle.delete(_id);
    if (!document) throw new Error(ErrorTypes.ObjectNotFound);
    return document;
  }
}

export default MotoService;
