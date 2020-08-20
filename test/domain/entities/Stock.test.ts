import {ProductShoe} from '../../../src/domain/entities/Product/ProductShoe';
import {UnitShoe} from '../../../src/domain/entities/Unit/UnitShoe';
import {StockType} from '../../../src/domain/entities/StockType';
import {Currency} from '../../../src/domain/entities/Currency';
import {Pricing} from '../../../src/domain/entities/Pricing';
import {Unit} from '../../../src/domain/entities/Unit/Unit';
import {Stock} from '../../../src/domain/entities/Stock';

var quantity: number;
var type: StockType;
var unit: Unit;

beforeEach(() => {
  const product = new ProductShoe('ARTIST', 'DESCRIPTION', 'NAME');
  const pricing = new Pricing(Currency.CAD, 10);
  unit = new UnitShoe(product, 1, [pricing]);

  type = StockType.SOLID;
  quantity = 5;
});

test('Non integer quantity should raise error', () => {
  quantity = 0.5;
  expect(() => new Stock(quantity, type, unit)).toThrowError();
});

test('Non positive quantity should raise error', () => {
  quantity = -2;
  expect(() => new Stock(quantity, type, unit)).toThrowError();
});

test('Cannot reserve non integer quantity', () => {
  const stock = new Stock(quantity, type, unit);
  const reserve = 0.5;

  expect(() => stock.Reserve(reserve)).toThrowError();
});

test('Cannot reserve non positive quantity', () => {
  const stock = new Stock(quantity, type, unit);
  const reserve = -2;

  expect(() => stock.Reserve(reserve)).toThrowError();
});

test('Cannot reserve more than existing quantity', () => {
  const stock = new Stock(quantity, type, unit);
  const reserve = 10;

  expect(() => stock.Reserve(reserve)).toThrowError();
});

test('Cannot reserve 0 items', () => {
  const stock = new Stock(quantity, type, unit);
  const reserve = 0;

  expect(() => stock.Reserve(reserve)).toThrowError();
});

test('Can reserve everything in stock', () => {
  const stock = new Stock(quantity, type, unit);
  const reserve = 5;

  expect(() => stock.Reserve(reserve)).not.toThrowError();
});

test('Can reserve a valid quantity', () => {
  const stock = new Stock(quantity, type, unit);
  const reserve = 3;

  expect(() => stock.Reserve(reserve)).not.toThrowError();
});

test('Remaining quantity must add to original after reserve', () => {
  const stock = new Stock(quantity, type, unit);
  const reserve = 2;

  stock.Reserve(reserve);

  expect(stock.Quantity + reserve).toEqual(quantity);
});

test('Property quantity must return provided value', () => {
  const stock = new Stock(quantity, type, unit);

  expect(stock.Quantity).toEqual(quantity);
});

test('Property type must return provided value', () => {
  const stock = new Stock(quantity, type, unit);

  expect(stock.Type).toEqual(type);
});

test('Property unit must return provided value', () => {
  const stock = new Stock(quantity, type, unit);

  expect(stock.Unit).toEqual(unit);
});

test('Instantiation with valid values should be successful', () => {
  expect(() => new Stock(quantity, type, unit)).not.toThrowError();
});
