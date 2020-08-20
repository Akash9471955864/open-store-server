import {Unit} from './Unit/Unit';

export class Stock {
  private validateQuantity(value: number) {
    if (value < 0) {
      throw new Error('Quantity must be positive');
    }
    if (!Number.isInteger(value)) {
      throw new Error('Quantity must be an integer');
    }
  }

  public Reserve(quantity: number) {
    if (!Number.isInteger(quantity)) {
      throw new Error('Quantity must be an integer');
    }
    if (quantity > this.quantity) {
      throw new Error('Insufficient items in stock!');
    }
    if (quantity <= 0) {
      throw new Error('Quantity must be a positive number');
    }
    this.quantity -= quantity;
  }

  public Release(quantity: number) {
    if (!Number.isInteger(quantity)) {
      throw new Error('Quantity must be an integer');
    }
    if (quantity <= 0) {
      throw new Error('Quantity must be a positive number');
    }
    this.quantity += quantity;
  }

  get Quantity() {
    return this.quantity;
  }

  get Unit() {
    return this.unit;
  }

  constructor(private quantity: number, private unit: Unit) {
    this.validateQuantity(quantity);
  }
}
