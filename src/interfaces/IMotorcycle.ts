import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const MotoZodSchema = VehicleZodSchema.extend({
  category: z.string({
    required_error: 'Category is required',
    invalid_type_error: 'Category must be a string',
  }).and(z.enum(['Street', 'Custom', 'Trail'])),
  engineCapacity: z.number({
    required_error: 'EngineCapacity is required',
    invalid_type_error: 'EngineCapacity must be a number',
  }).int()
    .gt(0, { message: 'Less than or equal 0, put a number between 0 and 2500' })
    .lte(2500, { message: 'Greater than 2500, put a number between 0 and 2500' }),
});

export type IMotorcycle = z.infer<typeof MotoZodSchema>;

export { MotoZodSchema };
