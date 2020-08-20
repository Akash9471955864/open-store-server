import {NonEmptyString} from '../../../src/validation/rules/NonEmptyString';
import {ValidationResult} from '../../../src/validation/ValidationResult';

test('Empty string should result in failed validation', () => {
  const string = '';
  const rule = new NonEmptyString();
  const result = new ValidationResult();

  rule.Validate(string, '', result);

  expect(result.Valid).toBe(false);
});

test('String with less characters than minimum should result in failed validation', () => {
  const string = '123';
  const rule = new NonEmptyString(4);
  const result = new ValidationResult();

  rule.Validate(string, '', result);

  expect(result.Valid).toBe(false);
});

test('Undefined string should result in failed validation', () => {
  const string = undefined;
  const rule = new NonEmptyString();
  const result = new ValidationResult();

  rule.Validate(string, '', result);

  expect(result.Valid).toBe(false);
});

test('Valid string should result in passed validation', () => {
  const string = '123';
  const rule = new NonEmptyString();
  const result = new ValidationResult();

  rule.Validate(string, '', result);

  expect(result.Valid).toBe(true);
});
