import {
  StockType,
  fromString,
  toString,
} from '../../../src/domain/entities/StockType';

describe.each([
  ['SOLID', StockType.SOLID],
  ['VIRTUAL', StockType.VIRTUAL],
])('There should be correct mapping', (text, status) => {
  it(`Should map from '${text}' to StockType.${text}`, () => {
    expect(fromString(text)).toEqual(status);
  });

  it(`Should map from StockType.${text} to '${text}'`, () => {
    expect(toString(status)).toEqual(text);
  });
});

test('Invalid string should map to undefined', () => {
  const text = '';
  expect(fromString(text)).toEqual(undefined);
});
