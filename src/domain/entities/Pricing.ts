import {Currency} from './Currency';

export class Pricing {
  private validatePrice(value: number) {
    if (!Number.isInteger(value)) {
      throw new Error('Price must be an integer');
    }
    if (value < 0) {
      throw new Error('Price must be a positive number');
    }
  }

  public Add(value: number): Pricing {
    return new Pricing(this.currency, this.price + value);
  }

  get Currency() {
    return this.currency;
  }

  get Price() {
    return this.price;
  }

  constructor(protected currency: Currency, protected price: number) {
    this.validatePrice(price);
  }
}
