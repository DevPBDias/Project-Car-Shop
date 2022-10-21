import { z } from 'zod';

const VehicleZodSchema = z.object({
  model: z.string().min(3, { message: 'Model must be 3 or more characters long' }),
  year: z.number()
    .gte(1900, { message: 'Menor que 1900' }).lte(2022, { message: 'Maior que 2022' }),
  color: z.string().min(3, { message: 'Color must be 3 or more characters long' }),
  status: z.boolean().optional(),
  buyValue: z.number().int({ message: 'buyValue must be a int number' }),
});

export type IVehicle = z.infer<typeof VehicleZodSchema>;

export { VehicleZodSchema };