import {
  Country,
  fromString,
  toString,
} from '../../../src/domain/entities/Country';

describe.each([
  ['ANY', Country.ANY],
  ['BRAZIL', Country.BRAZIL],
  ['CANADA', Country.CANADA],
])('There should be correct mapping', (text, status) => {
  it(`Should map from '${text}' to Country.${text}`, () => {
    expect(fromString(text)).toEqual(status);
  });

  it(`Should map from Country.${text} to '${text}'`, () => {
    expect(toString(status)).toEqual(text);
  });
});

test('Invalid string should map to undefined', () => {
  const text = '';
  expect(fromString(text)).toEqual(undefined);
});
