import {CatalogEntry} from '../../../src/domain/entities/CatalogEntry';
import {Product} from '../../../src/domain/entities/Product/Product';

jest.mock('../../../src/domain/entities/Product/Product');
const mockProduct = <jest.Mock<Product>>Product;

test('Property product should return provided value', () => {
  const product = mockProduct.mock.instances[0];
  const entry = new CatalogEntry(product);

  expect(entry.Product).toBe(product);
});
