import {ProductShoe} from '../../../../src/domain/entities/Product/ProductShoe';
import {UnitShoe} from '../../../../src/domain/entities/Unit/UnitShoe';
import {Pricing} from '../../../../src/domain/entities/Pricing';

jest.mock('../../../../src/domain/entities/Product/ProductShoe');
jest.mock('../../../../src/domain/entities/Pricing');

const mockProductShoe = <jest.Mock<ProductShoe>>ProductShoe;
const mockPricing = <jest.Mock<Pricing>>Pricing;

var product: ProductShoe;
var pricing: Pricing;
var size: number;

beforeEach(() => {
  mockProductShoe.mockClear();

  product = mockProductShoe.mock.instances[0];
  pricing = mockPricing.mock.instances[0];
  size = 5;
});

test('Should not accept size smaller than 0', () => {
  size = -1;
  expect(() => new UnitShoe(product, size, [pricing])).toThrowError();
});

test('Should not accept size that is not unit or half unit', () => {
  size = 1.4;
  expect(() => new UnitShoe(product, size, [pricing])).toThrowError();
});

test('Should accept values made of half units', () => {
  size = 3.5;
  expect(() => new UnitShoe(product, size, [pricing])).not.toThrowError();
});

test('Property Product should return provided value', () => {
  const unit = new UnitShoe(product, size, [pricing]);
  expect(unit.Product).toEqual(product);
});

test('Property Size should return provided value', () => {
  const unit = new UnitShoe(product, size, [pricing]);
  expect(unit.Size).toEqual(size);
});
