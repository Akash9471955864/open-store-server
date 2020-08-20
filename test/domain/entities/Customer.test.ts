import {Customer} from '../../../src/domain/entities/Customer';

test('Should not accept invalid email address', () => {
  const email = 'invalid.com';
  expect(() => new Customer(email, 'John Doe')).toThrowError();
});

test('Should not accept invalid name', () => {
  const name = '';
  expect(() => new Customer('not@invalid.com', name)).toThrowError();
});

test('Property email should return provided value', () => {
  const name = 'John Doe';
  const email = 'my@email.com';
  const customer = new Customer(email, name);

  expect(customer.Email).toEqual(email);
});

test('Property name should return provided value', () => {
  const name = 'John Doe';
  const email = 'my@email.com';
  const customer = new Customer(email, name);

  expect(customer.Name).toEqual(name);
});
