import {ProductCase} from '../Product/ProductCase';
import {Pricing} from '../Pricing';
import {Unit} from './Unit';

export class UnitCase extends Unit {
  private validateDevice(value: string) {
    if (value.trim().length < 2) {
      throw new Error('Device must have at least two non-blank characters');
    }
  }

  get Device() {
    return this.device;
  }

  /* istanbul ignore next */
  public toString(): string {
    const str = super.toString();
    return `${str}\nDEVICE: ${this.device}`;
  }

  constructor(
    protected product: ProductCase,
    protected device: string,
    price: Pricing,
    id?: string
  ) {
    super(product, price, id);
    this.validateDevice(device);
  }
}
