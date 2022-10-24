import { expect } from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import CarController from '../../../controllers/CarController';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carMock, carMockWithId } from '../mocks/carMocks';


describe('car Controller', () => {
  const _carModel = new CarModel()
  const _carService = new CarService(_carModel);
  const _carController = new CarController(_carService);
  const req = {} as Request; 
  const res = {} as Response;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore()
  })

  describe('Create car', () => {
    beforeEach(() => {
      sinon.stub(_carService, 'create').resolves(carMock);
    })

    it('Success', async () => {
      req.body = carMock;
      await _carController.create(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(201)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(carMock)).to.be.true;
    });
  });

  describe('Read all cars', () => {
    beforeEach(() => {
      sinon.stub(_carService, 'read').resolves([carMockWithId]);
    })

    it('Success', async () => {
      await _carController.read(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith([carMockWithId])).to.be.true;
    });
  });


  describe('ReadOne car', () => {
    beforeEach(() => {
      sinon.stub(_carService, 'readOne').resolves(carMock);
    })

    it('Success', async () => {
      req.params = { id: carMockWithId._id };
      await _carController.readOne(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(carMock)).to.be.true;
    });
  });

  describe('Update car', () => {
    it('Success', async () => {
      sinon.stub(_carService, 'update').resolves(carMockWithId)
      await _carController.update(req, res)

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    })
  })

  describe('Delete car', () => {
    beforeEach(() => {
      sinon.stub(_carService, 'delete').resolves(carMockWithId);
    })

    it('Success', async () => {
      req.params = { id: carMockWithId._id };
      await _carController.delete(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(204)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    });
  });


});