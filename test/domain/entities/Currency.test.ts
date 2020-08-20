import {
  Currency,
  fromString,
  toString,
} from '../../../src/domain/entities/Currency';

describe.each([
  ['BRL', Currency.BRL],
  ['CAD', Currency.CAD],
])('There should be correct mapping', (text, status) => {
  it(`Should map from '${text}' to Currency.${text}`, () => {
    expect(fromString(text)).toEqual(status);
  });

  it(`Should map from Currency.${text} to '${text}'`, () => {
    expect(toString(status)).toEqual(text);
  });
});

test('Invalid string should map to undefined', () => {
  const text = '';
  expect(fromString(text)).toEqual(undefined);
});
