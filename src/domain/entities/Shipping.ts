import {ShippingType} from './ShippingType';
import {Address} from './Address';
import {Pricing} from './Pricing';

export class Shipping {
  get Tracking() {
    return this.tracking;
  }

  get Address() {
    return this.address;
  }

  get Price() {
    return this.price;
  }

  get Type() {
    return this.type;
  }

  constructor(
    private tracking: string | undefined,
    private type: ShippingType,
    private address: Address,
    private price: Pricing
  ) {}
}
