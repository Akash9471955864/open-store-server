import {
  BillingStatus,
  fromString,
  toString,
} from '../../../src/domain/entities/BillingStatus';

describe.each([
  ['CANCELLED', BillingStatus.CANCELLED],
  ['CONFIRMED', BillingStatus.CONFIRMED],
  ['PENDING', BillingStatus.PENDING],
])('There should be correct mapping', (text, status) => {
  it(`Should map from '${text}' to BillingStatus.${text}`, () => {
    expect(fromString(text)).toEqual(status);
  });

  it(`Should map from BillingStatus.${text} to '${text}'`, () => {
    expect(toString(status)).toEqual(text);
  });
});

test('Invalid string should map to undefined', () => {
  const text = '';
  expect(fromString(text)).toEqual(undefined);
});
