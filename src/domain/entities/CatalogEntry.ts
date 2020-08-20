import {Product} from './Product/Product';
import {Pricing} from './Pricing';

export class CatalogEntry {
  get Quantity() {
    return this.quantity;
  }

  get Product() {
    return this.product;
  }

  get Price() {
    return this.price;
  }

  constructor(
    protected product: Product,
    protected quantity: number,
    protected price: Pricing
  ) {}
}
