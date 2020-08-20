import {
  OrderStatus,
  fromString,
  toString,
} from '../../../src/domain/entities/OrderStatus';

describe.each([
  ['CANCELLED', OrderStatus.CANCELLED],
  ['DELIVERED', OrderStatus.DELIVERED],
  ['COMPLETE', OrderStatus.COMPLETE],
  ['RESERVED', OrderStatus.RESERVED],
  ['CREATED', OrderStatus.CREATED],
  ['SHIPPED', OrderStatus.SHIPPED],
])('There should be correct mapping', (text, status) => {
  it(`Should map from '${text}' to OrderStatus.${text}`, () => {
    expect(fromString(text)).toEqual(status);
  });

  it(`Should map from OrderStatus.${text} to '${text}'`, () => {
    expect(toString(status)).toEqual(text);
  });
});

test('Invalid string should map to undefined', () => {
  const text = '';
  expect(fromString(text)).toEqual(undefined);
});
