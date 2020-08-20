import {PaymentStatus} from '../../../../src/domain/entities/Payment/PaymentStatus';
import {SamplePayment} from './SamplePayment';

const status = PaymentStatus.CREATED;

test('Authorize should change status of payment', () => {
  const payment = new SamplePayment(status);
  payment.Authorize();

  expect(payment.Status).toEqual(PaymentStatus.AUTHORIZED);
});

test('Capture should change status of payment', () => {
  const payment = new SamplePayment(status);
  payment.Capture();

  expect(payment.Status).toEqual(PaymentStatus.CAPTURED);
});

test('Cancel should change status of payment', () => {
  const payment = new SamplePayment(status);
  payment.Cancel();

  expect(payment.Status).toEqual(PaymentStatus.CANCELLED);
});

test('Property status should return provided value', () => {
  const payment = new SamplePayment(status);
  expect(payment.Status).toEqual(status);
});

test("getPaymentHandler should return 'SAMPLE'", () => {
  const payment = new SamplePayment(status);
  expect(payment.getPaymentHandler()).toEqual('SAMPLE');
});
