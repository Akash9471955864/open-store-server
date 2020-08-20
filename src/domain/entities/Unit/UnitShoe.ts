import {ProductShoe} from '../Product/ProductShoe';
import {Pricing} from '../Pricing';
import {Unit} from './Unit';

export class UnitShoe extends Unit {
  private validateSize(value: number) {
    if (value < 0) {
      throw new Error('Size must be greater than zero');
    }
    if (!Number.isInteger(value) && value % 1 !== 0.5) {
      throw new Error('Size must be composed of units and half-units');
    }
  }

  get Size(): number {
    return this.size;
  }

  /* istanbul ignore next */
  public toString(): string {
    const str = super.toString();
    return `${str}\nSIZE: ${this.size}`;
  }

  constructor(
    protected product: ProductShoe,
    protected size: number,
    price: Pricing,
    id?: string
  ) {
    super(product, price, id);
    this.validateSize(size);
  }
}
