import { Injectable , BadRequestException} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto'; 

@Injectable()
export class PaymentService {
  private users = [
    {
      email:"abc@gmail.com"
    },

    {
      email:"wxy@gmail.com"
    },

    {
      email:"xyz@gmail.com"
    }
  ]
  async createPayment(createPaymentDto: CreatePaymentDto) {
    const { email } = createPaymentDto;
    const user = this.users.find((user) => user.email === email);
    if(user){
      return {
        status:'success'
      };
    }else{
      throw new BadRequestException();
    }
   
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
