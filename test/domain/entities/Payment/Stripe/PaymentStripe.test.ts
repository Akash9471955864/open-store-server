import {PaymentStripe} from '../../../../../src/domain/entities/Payment/Stripe/PaymentStripe';
import {PaymentStatus} from '../../../../../src/domain/entities/Payment/PaymentStatus';

var status: PaymentStatus;
var clientSecret: string;
var intent: string;

beforeEach(() => {
  clientSecret = 'xxxxx-xxxxx-xxxxx-xxxxx';
  status = PaymentStatus.CREATED;
  intent = 'PIXXX-XXXXX';
});

test('Should not accept empty client secret', () => {
  clientSecret = '\t';
  expect(() => new PaymentStripe(clientSecret, intent, status)).toThrowError();
});

test('Should not accept empty intent', () => {
  intent = '\t';
  expect(() => new PaymentStripe(clientSecret, intent, status)).toThrowError();
});

test('getPaymentParam should return expected value', () => {
  const payment = new PaymentStripe(clientSecret, intent, status);
  const param = payment.getPaymentParam();

  expect(param.ClientSecret).toEqual(clientSecret);
  expect(param.Intent).toEqual(intent);
});

test("getPaymentHandler should return 'STRIPE'", () => {
  const payment = new PaymentStripe(clientSecret, intent, status);
  expect(payment.getPaymentHandler()).toEqual('STRIPE');
});
