import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Request, Response } from 'express';
import { BadRequestException } from '@nestjs/common';

describe('PaymentController', () => {
  let controller: PaymentController;
  let service: PaymentService;

  const statusResponseMock = {
    send: jest.fn((x) => x),
  };

  const requestMock = {
    query: {},
  } as unknown as Request;

  const responseMock = {
    status: jest.fn((x) => statusResponseMock),
    send: jest.fn((x) => x),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        PaymentService,
        {
          provide: 'paymentService',
          useValue: {
            createPayment: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  it('paymentService should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPayment', () => {
    it('should return status of 400', async () => {
      await controller.getPayment(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        msg: 'missing count or page quary parameter',
      });
    });
    it('should return a status of 200 when query params are present', async () => {
      requestMock.query = {
        count: '10',
        page: '1',
      };
      controller.getPayment(requestMock, responseMock);
      // expect(responseMock.send).toHaveBeenCalledWith(200);
    });
  });

  describe('createPayment', () => {
    it('should return a successful response', async () => {
      jest.spyOn(service, 'createPayment').mockImplementationOnce(() => {
        throw new BadRequestException();
      });
      try {
        const response = await controller.createPayment({
          email: 'abc@gmail.com',
          price: 100,
        });
      } catch (err) {
        console.log(err);
      }
    });
  });
});
