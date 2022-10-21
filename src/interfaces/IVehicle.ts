// 02 - Crie a interface IVehicle genérica
// Crie a interface IVehicle, que será usada para criarmos nossos tipos de carro, moto e caminhão. Ela deverá ter todos os atributos comuns de todos os veículos que listaremos aqui. São eles:

// Atributo Descrição
// model Marca e/ou modelo do veículo. Deve ser uma string com, pelo menos, 3 caracteres
// year Ano de fabricação do veículo. Deve ser um valor inteiro positivo maior ou igual a 1900, porém menor ou igual a 2022
// color Cor principal do veículo. Deve ser uma string com, pelo menos, 3 caracteres
// status Status que define se um veículo pode ou não ser comprado. Deve receber valores booleanos e deve ser opcional
// buyValue Valor de compra do veículo. Deve receber apenas números inteiros
// O arquivo deve ficar no diretório /src/interfaces/ e ter o nome de IVehicle.ts.
// A interface deve ser exportada com o nome de IVehicle e não deve ser exportada de forma padrão.
// warning Apenas os tipos dos atributos serão avaliados nesse requisito
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