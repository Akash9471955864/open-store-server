import {Stripe} from 'stripe';

export interface IStripeService {
  getPaymentIntent(id: string): Promise<Stripe.PaymentIntent>;
  capturePaymentIntent(id: string): Promise<void>;
  cancelPaymentIntent(id: string): Promise<void>;
  createPaymentIntent(
    price: number,
    currency: string
  ): Promise<Stripe.PaymentIntent>;
  buildEvent(
    content: string | Buffer,
    signature: string | string[]
  ): Stripe.Event;
}
