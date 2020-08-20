import {Order} from '../../../domain/entities/Order';

export interface IEmailService {
  sendInternalOrderPlacedEmail(order: Order): void;
  sendOrderConfirmedEmail(order: Order): void;
  sendOrderCancelledEmail(order: Order): void;
  sendPaymentFailedEmail(order: Order): void;
  sendContactMessage(
    name: string,
    email: string,
    order: string,
    message: string
  ): void;
}
