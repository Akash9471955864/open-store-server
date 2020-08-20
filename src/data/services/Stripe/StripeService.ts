import {PaymentStripe} from '../../../domain/entities/Payment/Stripe/PaymentStripe';
import {PaymentStatus} from '../../../domain/entities/Payment/PaymentStatus';
import {IPaymentService} from '../../../domain/services/IPaymentService';
import {Payment} from '../../../domain/entities/Payment/Payment';
import {toString} from '../../../domain/entities/Currency';
import {Pricing} from '../../../domain/entities/Pricing';
import {IStripeService} from './IStripeService';
import {injectable} from 'inversify';
import {Stripe} from 'stripe';

@injectable()
export class StripeService implements IStripeService, IPaymentService {
  // Stripe Service
  async getPaymentIntent(id: string): Promise<Stripe.PaymentIntent> {
    const client = this.getClient();
    return await client.paymentIntents.retrieve(id);
  }

  async capturePaymentIntent(id: string): Promise<void> {
    const client = this.getClient();
    await client.paymentIntents.capture(id);
  }

  async cancelPaymentIntent(id: string): Promise<void> {
    const client = this.getClient();
    await client.paymentIntents.cancel(id);
  }

  async createPaymentIntent(
    price: number,
    currency: string
  ): Promise<Stripe.PaymentIntent> {
    const client = this.getClient();

    const payment_intent: Stripe.PaymentIntentCreateParams = {
      amount: price,
      currency: currency,
      capture_method: 'manual',
      payment_method_types: ['card'],
    };

    return await client.paymentIntents.create(payment_intent);
  }

  buildEvent(
    content: string | Buffer,
    signature: string | string[]
  ): Stripe.Event {
    const client = this.getClient();
    const endpoint_secret = process.env.STRIPE_ENDPOINT_SECRET;
    return client.webhooks.constructEvent(content, signature, endpoint_secret!);
  }

  private getClient(): Stripe {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey) {
      throw new Error(
        'Failed to retrieve STRIPE_SECRET_KEY from the environment'
      );
    }

    return new Stripe(apiKey, {apiVersion: '2020-03-02'});
  }

  // Payment Service
  async Create(pricing: Pricing): Promise<Payment> {
    const currency = toString(pricing.Currency).toLowerCase();
    const paymentIntent = await this.createPaymentIntent(
      pricing.Price,
      currency
    );

    return new PaymentStripe(
      paymentIntent.client_secret!,
      paymentIntent.id,
      PaymentStatus.CREATED
    );
  }

  async Cancel(payment: Payment): Promise<void> {
    if (!(payment instanceof PaymentStripe)) {
      throw new Error('Invalid payment type for cancellation');
    }

    await this.cancelPaymentIntent(payment.Intent);
    payment.Cancel();
  }
}
