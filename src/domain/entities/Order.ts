import {OrderStatus} from './OrderStatus';
import {Customer} from './Customer';
import {Shipping} from './Shipping';
import {Billing} from './Billing';
import {Pricing} from './Pricing';
import {Entity} from './Entity';
import {Item} from './Item';

export class Order extends Entity {
  private validateItems(value: Item[]) {
    if (value.length === 0) {
      throw new Error('There must be at least one item in the order');
    }
  }

  calculateSubtotal(): Pricing {
    const currency = this.items[0].Price.Currency;
    let sum = 0;

    this.items.forEach(x => (sum += x.Price.Price));

    return new Pricing(currency, sum);
  }

  get Customer() {
    return this.customer;
  }

  get Shipping() {
    return this.shipping;
  }

  get Billing() {
    return this.billing;
  }

  get Status() {
    return this.status;
  }

  get Items() {
    return Array.from(this.items);
  }

  get Date() {
    return this.date;
  }

  Complete() {
    this.status = OrderStatus.COMPLETE;
  }

  Deliver() {
    this.status = OrderStatus.DELIVERED;
  }

  Reserve() {
    this.status = OrderStatus.RESERVED;
  }

  Release() {
    this.status = OrderStatus.CREATED;
  }

  Cancel() {
    this.status = OrderStatus.CANCELLED;
  }

  Ship() {
    this.status = OrderStatus.SHIPPED;
  }

  constructor(
    protected status: OrderStatus,
    protected customer: Customer,
    protected shipping: Shipping,
    protected billing: Billing,
    protected items: Item[],
    protected date: Date,
    id?: string
  ) {
    super(id);
    this.validateItems(items);
  }
}
