export class PaymentParamStripe {
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

  get ClientSecret() {
    return this.clientSecret;
  }

  get Intent() {
    return this.intent;
  }

  constructor(private clientSecret: string, private intent: string) {
    this.validateClientSecret(clientSecret);
    this.validateIntent(intent);
  }
}
