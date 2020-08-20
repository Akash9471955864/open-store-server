import {
  PaymentStatus,
  fromString,
  toString,
} from '../../../../src/domain/entities/Payment/PaymentStatus';

describe.each([
  ['AUTHORIZED', PaymentStatus.AUTHORIZED],
  ['CANCELLED', PaymentStatus.CANCELLED],
  ['CAPTURED', PaymentStatus.CAPTURED],
  ['CREATED', PaymentStatus.CREATED],
])('There should be correct mapping', (text, status) => {
  it(`Should map from '${text}' to PaymentStatus.${text}`, () => {
    expect(fromString(text)).toEqual(status);
  });

  it(`Should map from PaymentStatus.${text} to '${text}'`, () => {
    expect(toString(status)).toEqual(text);
  });
});

test('Invalid string should map to undefined', () => {
  const text = '';
  expect(fromString(text)).toEqual(undefined);
});
