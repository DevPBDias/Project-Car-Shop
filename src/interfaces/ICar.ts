import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number()
    .gte(2, { message: 'Menor que 2' }).lte(4, { message: 'Maior que 4' }),
  seatsQty: z.number()
    .gte(2, { message: 'Menor que 2' }).lte(7, { message: 'Maior que 7' }),
});

export type ICar = z.infer<typeof CarZodSchema>;

export { CarZodSchema };
