import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/CatalogErrors';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carMock, carMockWithId } from '../mocks/carMocks';

describe('car Service', () => {
	const _carModel = new CarModel();
	const _carService = new CarService(_carModel);
	
	before(() => {
		sinon.stub(_carModel, 'create').resolves(carMockWithId);
		sinon.stub(_carModel, 'read').resolves([carMockWithId]);
		sinon.stub(_carModel, 'readOne')
			.onCall(0).resolves(carMockWithId)
			.onCall(1).resolves(null);
		sinon.stub(_carModel, 'update')
			.onCall(0).resolves(carMockWithId)
			.onCall(1).resolves(null);
		sinon.stub(_carModel, 'delete')
			.onCall(0).resolves(carMockWithId)
			.onCall(1).resolves(null);;
	});

	after(() => {
		sinon.restore();
	});
  
	describe('Create car', () => {
		it('Success', async () => {
			const carCreated = await _carService.create(carMock);
			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			let error;

			try {
				await _carService.create({});
			} catch (err) {
				error = err;
			}
			expect(error).to.be.instanceOf(ZodError);
		});
	});

	describe('read all cars', () => {
		it('Success', async () => {
			const cars = await _carService.read();
			expect(cars).to.be.deep.equal([carMockWithId]);
		});
		it('Failure', async () => {
			let error;

			try {
				await _carService.read();
			} catch (err:any) {
				error = err;
			}
			expect(error).to.be.undefined;
		});
	});

	describe('ReadOne car', () => {
		it('Success', async () => {
			const car = await _carService.readOne('any-id');
			expect(car).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			let error;

			try {
				await _carService.readOne(carMockWithId._id);
			} catch (err:any) {
				error = err;
			}
			expect(error?.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
		});
	});

	describe('Update car', () => {
		it('Success', async () => {
			const updated = await _carService.update('any-id', carMock);
			expect(updated).to.be.deep.eq(carMockWithId);
		})
		
		it('Failure - Zod', async () => {
			let error;

			try {
				await _carService.update('any-id', { INVALID: "OBJECT" })
			} catch(err) {
				error = err;
			}
			expect(error).to.be.instanceOf(ZodError)
		})

		it('Failure - car not Found', async () => {
			let error: any;

			try {
				await _carService.update('any-id', carMock)
			} catch(err) {
				error = err;
			}
			expect(error?.message).to.be.eq(ErrorTypes.ObjectNotFound)
		})
	})

	describe('Delete car', () => {
		it('Success', async () => {
			const deleted = await _carService.delete('any-id');
			expect(deleted).to.be.deep.eq(carMockWithId);
		});
		
		it('Failure - car not Found', async () => {
			let error: any;

			try {
				await _carService.delete('any-id');
			} catch(err) {
				error = err;
			}
			expect(error?.message).to.be.eq(ErrorTypes.ObjectNotFound)
		})
	})

});