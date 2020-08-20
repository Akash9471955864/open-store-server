import {Product} from '../../../../src/domain/entities/Product/Product';
import {Pricing} from '../../../../src/domain/entities/Pricing';
import {Unit} from '../../../../src/domain/entities/Unit/Unit';
import {SampleUnit} from './SampleUnit';

// Create Mocks
jest.mock('../../../../src/domain/entities/Product/Product');
jest.mock('../../../../src/domain/entities/Pricing');

const mockProduct = <jest.Mock<Product>>Product;
const mockPricing = <jest.Mock<Pricing>>Pricing;

var product: Product;
var pricing: Pricing;
var size: number;

// Run tests
beforeEach(() => {
  product = mockProduct.mock.instances[0];
  pricing = mockPricing.mock.instances[0];
  size = 5;
});

test('Property Product should return provided value', () => {
  const unit: Unit = new SampleUnit([pricing], product);
  expect(unit.Product).toEqual(product);
});

test('Property Prices should return provided value', () => {
  const unit: Unit = new SampleUnit([pricing], product);
  expect(unit.Prices).toContain(pricing);
  expect(unit.Prices).toHaveLength(1);
});
