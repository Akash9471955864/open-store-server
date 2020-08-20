import {ProductCase} from '../../../../src/domain/entities/Product/ProductCase';

var description: string;
var artist: string;
var name: string;

beforeEach(() => {
  description = 'This is a valid product description';
  artist = 'John Doe';
  name = 'My Case 1';
});

test('Should not accept artist with no non-white characters', () => {
  artist = '\n\t\n';
  expect(() => new ProductCase(artist, description, name)).toThrowError();
});

test('Property artist should return provided value', () => {
  const product = new ProductCase(artist, description, name);
  expect(product.Artist).toEqual(artist);
});
