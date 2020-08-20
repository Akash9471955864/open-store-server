import {Currency} from '../../../src/domain/entities/Currency';
import {Pricing} from '../../../src/domain/entities/Pricing';

test('Non integer price should raise error', () => {
  const currency = Currency.CAD;
  const price = 1.5;

  expect(() => new Pricing(currency, price)).toThrowError();
});

test('Non positive price should raise error', () => {
  const currency = Currency.CAD;
  const price = -1.0;

  expect(() => new Pricing(currency, price)).toThrowError();
});

test('Property currency must return passed value', () => {
  const currency = Currency.CAD;
  const price = 1;

  const pricing = new Pricing(currency, price);

  expect(pricing.Currency).toEqual(currency);
});

test('Property price must return passed value', () => {
  const currency = Currency.CAD;
  const price = 1;

  const pricing = new Pricing(currency, price);

  expect(pricing.Price).toEqual(price);
});

test('Instantiation with valid values should be successful', () => {
  const currency = Currency.CAD;
  const price = 1;

  expect(() => new Pricing(currency, price)).not.toThrowError();
});
