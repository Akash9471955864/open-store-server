import {PaymentParamStripe} from './PaymentParamStripe';
import {PaymentStatus} from '../PaymentStatus';
import {Payment} from '../Payment';

export class PaymentStripe extends Payment {
  private validateClientSecret(value: string) {
    if (value.trim().length < 1) {
      throw new Error('Client secret cannot be empty');
    }
  }

  private validateIntent(value: string) {
    if (value.trim().length < 1) {
      throw new Error('Intent cannot be empty');
    }
  }

  public getPaymentParam(): PaymentParamStripe {
    return new PaymentParamStripe(this.clientSecret, this.intent);
  }

  public getPaymentHandler(): string {
    return 'STRIPE';
  }

  get ClientSecret() {
    return this.clientSecret;
  }

  get Intent() {
    return this.intent;
  }

  constructor(
    protected clientSecret: string,
    protected intent: string,
    status: PaymentStatus
  ) {
    super(status);
    this.validateClientSecret(clientSecret);
    this.validateIntent(intent);
  }
}
