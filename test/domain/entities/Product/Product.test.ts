import {SampleProduct} from './SampleProduct';

var description: string;
var name: string;

beforeEach(() => {
  description = 'This is a valid product description';
  name = 'My Product 1.0';
});

test('Should not accept description with less than 2 non-white characters', () => {
  description = 'a';
  expect(() => new SampleProduct(description, name)).toThrowError();
});

test('Should not accept name with less than 2 non-white characters', () => {
  name = 'a';
  expect(() => new SampleProduct(description, name)).toThrowError();
});

test('Property Description should return provided value', () => {
  const product = new SampleProduct(description, name);
  expect(product.Description).toEqual(description);
});

test('Property Name should return provided value', () => {
  const product = new SampleProduct(description, name);
  expect(product.Name).toEqual(name);
});
