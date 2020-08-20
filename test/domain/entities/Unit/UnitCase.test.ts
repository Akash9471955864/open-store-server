import {ProductCase} from '../../../../src/domain/entities/Product/ProductCase';
import {UnitCase} from '../../../../src/domain/entities/Unit/UnitCase';
import {Pricing} from '../../../../src/domain/entities/Pricing';

jest.mock('../../../../src/domain/entities/Product/ProductCase');
jest.mock('../../../../src/domain/entities/Pricing');

const mockProductCase = <jest.Mock<ProductCase>>ProductCase;
const mockPricing = <jest.Mock<Pricing>>Pricing;

var product: ProductCase;
var pricing: Pricing;
var device: string;

beforeEach(() => {
  mockProductCase.mockClear();

  product = mockProductCase.mock.instances[0];
  pricing = mockPricing.mock.instances[0];
  device = 'iPhone 11';
});

test('Should not accept device with less than two non-white characters', () => {
  device = 'a';
  expect(() => new UnitCase(product, device, [pricing])).toThrowError();
});

test('Property Product should return provided value', () => {
  const unit = new UnitCase(product, device, [pricing]);
  expect(unit.Product).toEqual(product);
});

test('Property Device should return provided value', () => {
  const unit = new UnitCase(product, device, [pricing]);
  expect(unit.Device).toEqual(device);
});
