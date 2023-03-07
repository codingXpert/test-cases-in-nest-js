import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';

@Module({
  controllers: [PaymentController],
  providers: [
    {
      provide:'paymentService',
      useClass:PaymentService
    }
  ]
})
export class PaymentModule {}
