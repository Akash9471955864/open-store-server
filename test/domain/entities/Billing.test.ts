import {BillingStatus} from '../../../src/domain/entities/BillingStatus';
import {Payment} from '../../../src/domain/entities/Payment/Payment';
import {Billing} from '../../../src/domain/entities/Billing';
import {Address} from '../../../src/domain/entities/Address';
import {Tax} from '../../../src/domain/entities/Tax/Tax';

jest.mock('../../../src/domain/entities/Payment/Payment');
jest.mock('../../../src/domain/entities/Address');
jest.mock('../../../src/domain/entities/Tax/Tax');

const mockPayment = <jest.Mock<Payment>>Payment;
const mockAddress = <jest.Mock<Address>>Address;
const mockTax = <jest.Mock<Tax>>Tax;

var status: BillingStatus;
var payment: Payment;
var address: Address;
var tax: Tax;

beforeEach(() => {
  mockPayment.mockClear();
  mockAddress.mockClear();
  mockTax.mockClear();

  payment = mockPayment.mock.instances[0];
  address = mockAddress.mock.instances[0];
  tax = mockTax.mock.instances[0];
  status = BillingStatus.PENDING;
});

test('Property Status should return provided value', () => {
  const billing = new Billing(status, address, payment, tax);
  expect(billing.Status).toEqual(status);
});

test('Property Address should return provided value', () => {
  const billing = new Billing(status, address, payment, tax);
  expect(billing.Address).toEqual(address);
});

test('Property Payment should return provided value', () => {
  const billing = new Billing(status, address, payment, tax);
  expect(billing.Payment).toEqual(payment);
});

test('Property Tax should return provided value', () => {
  const billing = new Billing(status, address, payment, tax);
  expect(billing.Tax).toEqual(tax);
});
