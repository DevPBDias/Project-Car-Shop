import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const MotoZodSchema = VehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int()
    .lte(2500, { message: 'Greater than 2500, put a number between 0 and 2500' }),
});

export type IMotorcycle = z.infer<typeof MotoZodSchema>;

export { MotoZodSchema };
