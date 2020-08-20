import {ProductShoe} from '../../../src/domain/entities/Product/ProductShoe';
import {CatalogEntry} from '../../../src/domain/entities/CatalogEntry';
import {Product} from '../../../src/domain/entities/Product/Product';
import {Catalog} from '../../../src/domain/entities/Catalog';
import {Country} from '../../../src/domain/entities/Country';

const product1 = new ProductShoe('ARTIST', 'DESCRIPTION', 'NAME', 'ID1');
const product2 = new ProductShoe('ARTIST', 'DESCRIPTION', 'NAME', 'ID2');

const entry1 = new CatalogEntry(product1);
const entry2 = new CatalogEntry(product2);

var startDate: Date;
var endDate: Date;

beforeEach(() => {
  startDate = new Date(2000, 1, 1);
  endDate = new Date(2000, 1, 2);
});

test('Should not accept startDate greater than endDate', () => {
  startDate = new Date(2000, 1, 3);

  expect(
    () =>
      new Catalog([entry1, entry2], Country.ANY, startDate, endDate, 'CATALOG')
  ).toThrowError();
});

test('Should not accept startDate equal to endDate', () => {
  endDate = new Date(2000, 1, 1);

  expect(
    () =>
      new Catalog([entry1, entry2], Country.ANY, startDate, endDate, 'CATALOG')
  ).toThrowError();
});

test('Should not accept duplicate entries', () => {
  expect(
    () =>
      new Catalog([entry1, entry1], Country.ANY, startDate, endDate, 'CATALOG')
  ).toThrowError();
});

test('Should not accept name with less than two non-white characters', () => {
  expect(
    () => new Catalog([entry1, entry2], Country.ANY, startDate, endDate, 'C')
  ).toThrowError();
});

test('Property Entries should return provided value', () => {
  const entries = [entry1, entry2];

  const catalog = new Catalog(
    entries,
    Country.ANY,
    startDate,
    endDate,
    'CATALOG'
  );

  expect(catalog.Entries).toEqual(entries);
});

test('Property StartDate should return provided value', () => {
  const catalog = new Catalog(
    [entry1, entry2],
    Country.ANY,
    startDate,
    endDate,
    'CATALOG'
  );

  expect(catalog.StartDate).toEqual(startDate);
});

test('Property EndDate should return provided value', () => {
  const catalog = new Catalog(
    [entry1, entry2],
    Country.ANY,
    startDate,
    endDate,
    'CATALOG'
  );

  expect(catalog.EndDate).toEqual(endDate);
});

test('Property Country should return provided value', () => {
  const catalog = new Catalog(
    [entry1, entry2],
    Country.ANY,
    startDate,
    endDate,
    'CATALOG'
  );

  expect(catalog.Country).toEqual(Country.ANY);
});

test('Property Name should return provided value', () => {
  const name = 'CATALOG';

  const catalog = new Catalog(
    [entry1, entry2],
    Country.ANY,
    startDate,
    endDate,
    name
  );

  expect(catalog.Name).toEqual(name);
});
