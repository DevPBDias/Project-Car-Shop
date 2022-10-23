import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { Model } from 'mongoose';
import {
    carMock,
	carMockWithId,
	carMockToUpdate,
	carMockToUpdateWithId,
} from '../mocks/carMocks';
import { ErrorTypes } from '../../../errors/CatalogErrors';

describe('car Model', () => {
	const _carModel = new CarModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(carMockWithId);
		sinon.stub(Model, 'find').resolves([carMockWithId]);
		sinon.stub(Model, 'findOne').resolves(carMockWithId);
		sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockToUpdateWithId);
		sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);

	});

	after(() => {
		sinon.restore();
	})

	describe('creating a car', () => {
		it('successfully created', async () => {
			const newcar = await _carModel.create(carMock);
			expect(newcar).to.be.deep.equal(carMockWithId);
		});
	});

    describe('searching all cars', () => {
		it('successfully found all cars', async () => {
			const cars = await _carModel.read();
			expect(cars).to.be.deep.equal([carMockWithId]);
		});
	});

	describe('searching a car', () => {
		it('successfully found the car', async () => {
			const carFound = await _carModel.readOne('4edd40c86762e0fb12000003');
			expect(carFound).to.be.deep.equal(carMockWithId);
		});

		it('_id not found', async () => {
			try {
				await _carModel.readOne('Wrong-id');
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});
	
	describe('changing a car', () => {
		it('successfully changed', async () => {
			const carsChanged = await _carModel.update('4edd40c86762e0fb12000003', carMockToUpdate);
			expect(carsChanged).to.be.deep.equal(carMockToUpdateWithId);
		});
	
		it('_id not found to change', async () => {
			try {
				await _carModel.update('Wrong-id', carMockToUpdate);
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});

    describe('removing a car', () => {
		it('successfully deleted', async () => {
			const carDeleted = await _carModel.delete('4edd40c86762e0fb12000003');
			expect(carDeleted).to.be.deep.equal(carMockWithId);
		});
	
		it('_id not found to delete', async () => {
			try {
				await _carModel.delete('Wrong-id');
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});
	
});