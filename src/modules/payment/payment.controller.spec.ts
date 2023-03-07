import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Request , Response } from 'express';

describe('PaymentController', () => {
  let controller: PaymentController;

  const statusResponseMock = {
    send:jest.fn((x) => x)
  }

  const requestMock = {
    query: {}
  } as unknown as Request;

  const responseMock = {
    status:jest.fn((x) =>statusResponseMock),
    send:jest.fn((x) => x)
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [PaymentService],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPayment', () => {
    it('should return status of 400', () => {
      controller.getPayment(requestMock , responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        msg: 'missing count or page quary parameter'
      });
    });
    it('should return a status of 200 when query params are present' , () => {
      requestMock.query ={
        count:'10',
        page:'1',
      }
      controller.getPayment(requestMock , responseMock)
      expect(responseMock.send).toHaveBeenCalledWith(200); 
    });
  });
});
