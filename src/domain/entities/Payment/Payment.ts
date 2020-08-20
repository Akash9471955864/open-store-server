import {PaymentStatus} from './PaymentStatus';
import {PaymentParam} from './PaymentParam';

export abstract class Payment {
  public abstract getPaymentParam(): PaymentParam;

  public abstract getPaymentHandler(): string;

  get Status() {
    return this.status;
  }

  Authorize() {
    this.status = PaymentStatus.AUTHORIZED;
  }

  Capture() {
    this.status = PaymentStatus.CAPTURED;
  }

  Cancel() {
    this.status = PaymentStatus.CANCELLED;
  }

  constructor(protected status: PaymentStatus) {}
}
