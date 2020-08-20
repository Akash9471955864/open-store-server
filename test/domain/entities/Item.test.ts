import {ProductShoe} from '../../../src/domain/entities/Product/ProductShoe';
import {UnitShoe} from '../../../src/domain/entities/Unit/UnitShoe';
import {Currency} from '../../../src/domain/entities/Currency';
import {Pricing} from '../../../src/domain/entities/Pricing';
import {Unit} from '../../../src/domain/entities/Unit/Unit';
import {Item} from '../../../src/domain/entities/Item';

jest.mock('../../../src/domain/entities/Product/ProductShoe');

const mockProduct = <jest.Mock<ProductShoe>>ProductShoe;

const pricingCAD = new Pricing(Currency.CAD, 10);
const pricingBRL = new Pricing(Currency.BRL, 20);
const quantity = 5;
var unit: Unit;

beforeEach(() => {
  unit = new UnitShoe(mockProduct.mock.instances[0], 10, [
    pricingCAD,
    pricingBRL,
  ]);
});

test('Should throw error if quantity is not integer', () => {
  const quantity = 5.5;
  expect(() => new Item(quantity, pricingCAD, unit)).toThrowError();
});

test('Should throw error if quantity is less than zero', () => {
  const quantity = -5;
  expect(() => new Item(quantity, pricingCAD, unit)).toThrowError();
});

test('Should give the correct total price', () => {
  const quantity = 10;
  const item = new Item(quantity, pricingCAD, unit);

  const totalPrice = item.TotalPrice;

  expect(totalPrice.Currency).toEqual(Currency.CAD);
  expect(totalPrice.Price).toEqual(100);
});

test('Should give the correct unit pricing', () => {
  const quantity = 10;
  const pricing = new Pricing(Currency.CAD, 30);
  const item = new Item(quantity, pricing, unit);

  const unitPricing = item.UnitPrice;

  expect(unitPricing).toBe(pricingCAD);
});

test('Should return the provided quantity', () => {
  const item = new Item(quantity, pricingCAD, unit);
  expect(item.Quantity).toEqual(quantity);
});

test('Should return the provided price', () => {
  const item = new Item(quantity, pricingCAD, unit);
  expect(item.Price).toEqual(pricingCAD);
});

test('Should return the provided unit', () => {
  const item = new Item(quantity, pricingCAD, unit);
  expect(item.Unit).toEqual(unit);
});
