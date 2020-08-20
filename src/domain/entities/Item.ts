import {Pricing} from './Pricing';
import {Unit} from './Unit/Unit';

export class Item {
  private validateQuantity(value: number) {
    if (!Number.isInteger(value)) {
      throw new Error('Quantity must be an integer');
    }
    if (value <= 0) {
      throw new Error('Quantity has to be greater than 0');
    }
  }

  get Quantity() {
    return this.quantity;
  }

  get Price() {
    return this.price;
  }

  get Unit() {
    return this.unit;
  }

  get TotalPrice(): Pricing {
    const price = this.price.Price * this.quantity;
    return new Pricing(this.price.Currency, price);
  }

  get UnitPrice(): Pricing {
    return this.unit.Price;
  }

  constructor(
    private quantity: number,
    private price: Pricing,
    private unit: Unit
  ) {
    this.validateQuantity(quantity);
  }
}
