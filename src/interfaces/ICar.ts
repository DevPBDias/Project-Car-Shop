import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number({
    required_error: 'DoorsQty is required',
    invalid_type_error: 'DoorsQty must be a number',
  })
    .gte(2, { message: 'Less than 2, put a number between 2 and 4' })
    .lte(4, { message: 'Greater than 4, put a number between 2 and 4' }),
  seatsQty: z.number({
    required_error: 'SeatsQty is required',
    invalid_type_error: 'SeatsQty must be a number',
  })
    .gte(2, { message: 'Less than 2, put a number between 2 and 7' })
    .lte(7, { message: 'Greater than 7, put a number between 2 and 7' }),
});

export type ICar = z.infer<typeof CarZodSchema>;

export { CarZodSchema };
