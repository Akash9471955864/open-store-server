import {ShippingType} from '../../../src/domain/entities/ShippingType';
import {Shipping} from '../../../src/domain/entities/Shipping';
import {Currency} from '../../../src/domain/entities/Currency';
import {Address} from '../../../src/domain/entities/Address';
import {Country} from '../../../src/domain/entities/Country';
import {Pricing} from '../../../src/domain/entities/Pricing';

var type: ShippingType;
var tracking: string;
var address: Address;
var price: Pricing;

beforeEach(() => {
  price = new Pricing(Currency.CAD, 1000);
  type = ShippingType.REGULAR;
  tracking = '123456789-0';
  address = new Address(
    'POSTAL CODE',
    Country.CANADA,
    'STREET',
    'STATE',
    'CITY'
  );
});

test('Property tracking returns provided value', () => {
  const shipping = new Shipping(tracking, type, address, price);
  expect(shipping.Tracking).toBe(tracking);
});

test('Property address returns provided value', () => {
  const shipping = new Shipping(tracking, type, address, price);
  expect(shipping.Address).toBe(address);
});

test('Property price returns provided value', () => {
  const shipping = new Shipping(tracking, type, address, price);
  expect(shipping.Price).toBe(price);
});

test('Property type returns provided value', () => {
  const shipping = new Shipping(tracking, type, address, price);
  expect(shipping.Type).toBe(type);
});

test('Instantiation with valid values should be successful', () => {
  expect(() => new Shipping(tracking, type, address, price)).not.toThrowError();
});
