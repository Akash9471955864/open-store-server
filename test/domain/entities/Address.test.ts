import {Address} from '../../../src/domain/entities/Address';
import {Country} from '../../../src/domain/entities/Country';

var postalCode: string;
var country: Country;
var street: string;
var state: string;
var city: string;

beforeEach(() => {
  postalCode = 'POSTAL-CODE';
  country = Country.CANADA;
  street = 'STREET';
  state = 'STATE';
  city = 'CITY';
});

test('Should not accept postal code with less than two non-white characters', () => {
  postalCode = 'a';
  expect(
    () => new Address(postalCode, country, street, state, city)
  ).toThrowError();
});

test('Should not accept street with less than two non-white characters', () => {
  street = 'a';
  expect(
    () => new Address(postalCode, country, street, state, city)
  ).toThrowError();
});

test('Should not accept state with less than two non-white characters', () => {
  state = 'a';
  expect(
    () => new Address(postalCode, country, street, state, city)
  ).toThrowError();
});

test('Should not accept city with less than two non-white characters', () => {
  city = 'a';
  expect(
    () => new Address(postalCode, country, street, state, city)
  ).toThrowError();
});

test('Property PostalCode should return the provided value', () => {
  const address = new Address(postalCode, country, street, state, city);
  expect(address.PostalCode).toEqual(postalCode);
});

test('Property Country should return the provided value', () => {
  const address = new Address(postalCode, country, street, state, city);
  expect(address.Country).toEqual(country);
});

test('Property Street should return the provided value', () => {
  const address = new Address(postalCode, country, street, state, city);
  expect(address.Street).toEqual(street);
});

test('Property State should return the provided value', () => {
  const address = new Address(postalCode, country, street, state, city);
  expect(address.State).toEqual(state);
});

test('Property City should return the provided value', () => {
  const address = new Address(postalCode, country, street, state, city);
  expect(address.City).toEqual(city);
});
