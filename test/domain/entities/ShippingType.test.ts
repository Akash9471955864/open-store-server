import {
  ShippingType,
  fromString,
  toString,
} from '../../../src/domain/entities/ShippingType';

describe.each([
  ['EXPRESS', ShippingType.EXPRESS],
  ['REGULAR', ShippingType.REGULAR],
  ['INTERNATIONAL', ShippingType.INTERNATIONAL],
])('There should be correct mapping', (text, status) => {
  it(`Should map from '${text}' to ShippingType.${text}`, () => {
    expect(fromString(text)).toEqual(status);
  });

  it(`Should map from ShippingType.${text} to '${text}'`, () => {
    expect(toString(status)).toEqual(text);
  });
});

test('Invalid string should map to undefined', () => {
  const text = '';
  expect(fromString(text)).toEqual(undefined);
});
