import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from './order-created.event';
import { CreateOrderRequest } from './create-order-request.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('BILLING_SERVICE') private readonly billingCilent: ClientKafka,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  createOrder({ userId, price }: CreateOrderRequest) {
    this.billingCilent.emit(
      'order_created',
      new OrderCreatedEvent('123', userId, price),
    );
  }
}
