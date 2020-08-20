import {PaymentParam} from '../../../../src/domain/entities/Payment/PaymentParam';
import {Payment} from '../../../../src/domain/entities/Payment/Payment';
import {SamplePaymentParam} from './SamplePaymentParam';

export class SamplePayment extends Payment {
  /* istanbul ignore next */
  public getPaymentParam(): PaymentParam {
    return new SamplePaymentParam();
  }

  /* istanbul ignore next */
  public getPaymentHandler(): string {
    return 'SAMPLE';
  }
}
