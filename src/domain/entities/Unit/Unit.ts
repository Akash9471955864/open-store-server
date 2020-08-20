import {Product} from '../Product/Product';
import * as Currency from '../Currency';
import {Pricing} from '../Pricing';
import {Entity} from '../Entity';

export abstract class Unit extends Entity {
  get Product() {
    return this.product;
  }

  get Price() {
    return this.price;
  }

  /* istanbul ignore next */
  public toString(): string {
    var result =
      `ID: ${this.id}\n` +
      `PRODUCT ID: ${this.product.ID}\n` +
      `PRODUCT: ${this.product.Name}\n`;

    result += `PRICE (${Currency.toString(this.price.Currency)}): \$${
      this.price.Price
    }\n`;

    return result;
  }

  constructor(
    protected product: Product,
    protected price: Pricing,
    protected id?: string
  ) {
    super(id);
  }
}
