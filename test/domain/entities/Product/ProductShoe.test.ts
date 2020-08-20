import {ProductShoe} from '../../../../src/domain/entities/Product/ProductShoe';

var description: string;
var artist: string;
var name: string;

beforeEach(() => {
  description = 'This is a valid product description';
  artist = 'John Doe';
  name = 'My Shoe 1';
});

test('Should not accept artist with no non-white characters', () => {
  artist = '\n\t\n';
  expect(() => new ProductShoe(artist, description, name)).toThrowError();
});

test('Property artist should return provided value', () => {
  const product = new ProductShoe(artist, description, name);
  expect(product.Artist).toEqual(artist);
});
