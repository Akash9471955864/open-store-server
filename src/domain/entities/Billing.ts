import {BillingStatus} from './BillingStatus';
import {Payment} from './Payment/Payment';
import {Address} from './Address';
import {Tax} from './Tax/Tax';

export class Billing {
  get Address() {
    return this.address;
  }

  get Payment() {
    return this.payment;
  }

  get Status() {
    return this.status;
  }

  get Tax() {
    return this.tax;
  }

  constructor(
    protected status: BillingStatus,
    protected address: Address,
    protected payment: Payment,
    protected tax: Tax
  ) {}
}
