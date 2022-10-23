export enum ErrorTypes {
  ObjectNotFound = 'ObjectNotFound',
  InvalidMongoId = 'InvalidMongoId',
  Undefined = 'Undefined',
}
  
  type ErrorResponseObject = { 
    error: string;
    httpStatus: number
  };
  
export type ErrorCatalog = Record<ErrorTypes, ErrorResponseObject>;
  
export const errorCatalog: ErrorCatalog = {
  ObjectNotFound: {
    error: 'Object not found',
    httpStatus: 404,
  },
  InvalidMongoId: {
    error: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
  Undefined: {
    error: 'Elements not found',
    httpStatus: 400,
  },
};