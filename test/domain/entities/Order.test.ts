import {OrderStatus} from '../../../src/domain/entities/OrderStatus';
import {Order} from '../../../src/domain/entities/Order';

import {Customer} from '../../../src/domain/entities/Customer';
import {Shipping} from '../../../src/domain/entities/Shipping';
import {Billing} from '../../../src/domain/entities/Billing';
import {Item} from '../../../src/domain/entities/Item';

jest.mock('../../../src/domain/entities/Customer');
jest.mock('../../../src/domain/entities/Shipping');
jest.mock('../../../src/domain/entities/Billing');
jest.mock('../../../src/domain/entities/Item');

const mockCustomer = <jest.Mock<Customer>>Customer;
const mockShipping = <jest.Mock<Shipping>>Shipping;
const mockBilling = <jest.Mock<Billing>>Billing;
const mockItem = <jest.Mock<Item>>Item;

var status: OrderStatus;
var customer: Customer;
var shipping: Shipping;
var billing: Billing;
var items: Item[];
var date: Date;

beforeEach(() => {
  mockCustomer.mockClear();
  mockShipping.mockClear();
  mockBilling.mockClear();
  mockItem.mockClear();

  customer = mockCustomer.mock.instances[0];
  shipping = mockShipping.mock.instances[0];
  billing = mockBilling.mock.instances[0];
  items = [mockItem.mock.instances[0]];

  status = OrderStatus.CREATED;
  date = new Date();
});

test('Cannot create order with no items', () => {
  items = [];
  expect(
    () => new Order(status, customer, shipping, billing, items, date)
  ).toThrowError();
});

test('Property customer must return provided value', () => {
  const order = new Order(status, customer, shipping, billing, items, date);
  expect(order.Customer).toBe(customer);
});

test('Property shipping must return provided value', () => {
  const order = new Order(status, customer, shipping, billing, items, date);
  expect(order.Shipping).toBe(shipping);
});

test('Property billing must return provided value', () => {
  const order = new Order(status, customer, shipping, billing, items, date);
  expect(order.Billing).toBe(billing);
});

test('Property items must return provided value', () => {
  const order = new Order(status, customer, shipping, billing, items, date);
  expect(order.Items).toEqual(items);
});

test('Property status must return provided value', () => {
  const order = new Order(status, customer, shipping, billing, items, date);
  expect(order.Status).toBe(status);
});

test('Property date must return provided value', () => {
  const order = new Order(status, customer, shipping, billing, items, date);
  expect(order.Date).toBe(date);
});

test('Complete must change order status', () => {
  const order = new Order(status, customer, shipping, billing, items, date);
  order.Complete();

  expect(order.Status).toEqual(OrderStatus.COMPLETE);
});

test('Deliver must change order status', () => {
  const order = new Order(status, customer, shipping, billing, items, date);
  order.Deliver();

  expect(order.Status).toEqual(OrderStatus.DELIVERED);
});

test('Reserve must change order status', () => {
  const order = new Order(status, customer, shipping, billing, items, date);
  order.Reserve();

  expect(order.Status).toEqual(OrderStatus.RESERVED);
});

test('Cancel must change order status', () => {
  const order = new Order(status, customer, shipping, billing, items, date);
  order.Cancel();

  expect(order.Status).toEqual(OrderStatus.CANCELLED);
});

test('Ship must change order status', () => {
  const order = new Order(status, customer, shipping, billing, items, date);
  order.Ship();

  expect(order.Status).toEqual(OrderStatus.SHIPPED);
});

test('Instantiation with valid values must be successful', () => {
  expect(
    () => new Order(status, customer, shipping, billing, items, date)
  ).not.toThrowError();
});
