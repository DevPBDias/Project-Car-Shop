import { ICar } from '../../../interfaces/ICar';

const carMock:ICar = {
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
};

const carMockWithId:ICar & { _id:string } = {
    _id: "4edd40c86762e0fb12000003",
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
};

const carMockToUpdate:ICar = {
    model: "Peugeot 207",
    year: 2011,
    color: "silver",
    buyValue: 35000,
    seatsQty: 4,
    doorsQty: 4
};

const carMockToUpdateWithId:ICar & { _id:string } = {
    _id: "4edd40c86762e0fb12000003",
    model: "Peugeot 207",
    year: 2011,
    color: "silver",
    buyValue: 35000,
    seatsQty: 4,
    doorsQty: 4
};

export {
	carMock,
	carMockWithId,
	carMockToUpdate,
	carMockToUpdateWithId,
};