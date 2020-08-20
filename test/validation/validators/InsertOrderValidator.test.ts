import 'reflect-metadata'; // Stops jest from complaining about InversifyJS

import {InsertOrderValidator} from '../../../src/validation/validators/InsertOrderValidator';
import {Request} from '../../../src/interactor/InsertOrder';

const email = 'valid@email.com';
const name = 'John Doe';

const billing_street = '123 Custom Drive';
const billing_postal_code = 'B1H1H1';
const billing_country = 'CANADA';
const billing_city = 'Halifax';
const billing_state = 'NS';

const shipping_street = '123 Custom Drive';
const shipping_postal_code = 'B1H1H1';
const shipping_country = 'CANADA';
const shipping_city = 'Halifax';
const shipping_state = 'NS';

const shipping_type = 'REGULAR';

const items: Array<[string, number]> = [
  ['b34d91eb-9b34-4e4d-a748-f53bd793897f', 1],
  ['978af24d-e0bd-46fb-8409-740cb44926f7', 2],
];

var request: Request;

beforeEach(() => {
  request = new Request();
  request.email = email;
  request.name = name;

  request.billing_postal_code = billing_postal_code;
  request.billing_country = billing_country;
  request.billing_street = billing_street;
  request.billing_state = billing_state;
  request.billing_city = billing_city;

  request.shipping_postal_code = shipping_postal_code;
  request.shipping_country = shipping_country;
  request.shipping_street = shipping_street;
  request.shipping_state = shipping_state;
  request.shipping_city = shipping_city;

  request.shipping_type = shipping_type;
  request.items = items;
});

test('It should be invalid if name is invalid', () => {
  request.name = '';

  const validator = new InsertOrderValidator();
  const result = validator.Validate(request);

  expect(result.Valid).toBe(false);
});

test('It should be invalid if email is invalid', () => {
  request.email = 'it@is@invalid.com';

  const validator = new InsertOrderValidator();
  const result = validator.Validate(request);

  expect(result.Valid).toBe(false);
});

test('It should be valid if all properties are valid', () => {
  const validator = new InsertOrderValidator();
  const result = validator.Validate(request);

  expect(result.Valid).toBe(true);
});
