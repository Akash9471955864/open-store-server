import {PaymentParamStripe} from '../../../../../src/domain/entities/Payment/Stripe/PaymentParamStripe';

var clientSecret: string;
var intent: string;

beforeEach(() => {
  clientSecret = 'xxxxx-xxxxx-xxxxx-xxxxx';
  intent = 'PIXXX-XXXXX';
});

test('Should not accept empty client secret', () => {
  clientSecret = '\t';
  expect(() => new PaymentParamStripe(clientSecret, intent)).toThrowError();
});

test('Should not accept empty intent', () => {
  intent = '\t';
  expect(() => new PaymentParamStripe(clientSecret, intent)).toThrowError();
});

test('Property ClientSecret should return provided value', () => {
  const paymentParam = new PaymentParamStripe(clientSecret, intent);
  expect(paymentParam.ClientSecret).toEqual(clientSecret);
});

test('Property Intent should return provided value', () => {
  const paymentParam = new PaymentParamStripe(clientSecret, intent);
  expect(paymentParam.Intent).toEqual(intent);
});
