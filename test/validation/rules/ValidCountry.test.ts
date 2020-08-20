import {ValidationResult} from '../../../src/validation/ValidationResult';
import {ValidCountry} from '../../../src/validation/rules/ValidCountry';

it('Should fail for undefined value', () => {
  const value = undefined;
  const rule = new ValidCountry();
  const result = new ValidationResult();

  rule.Validate(value, '', result);

  expect(result.Valid).toBe(false);
});

it('Should fail for invalid country', () => {
  const value = 'ISLAND';
  const rule = new ValidCountry();
  const result = new ValidationResult();

  rule.Validate(value, '', result);

  expect(result.Valid).toBe(false);
});

it('Should fail for "ANY" if option is not set', () => {
  const value = 'ANY';
  const rule = new ValidCountry(false);
  const result = new ValidationResult();

  rule.Validate(value, '', result);

  expect(result.Valid).toBe(false);
});

it('Shoud succeed for "ANY" if option is set', () => {
  const value = 'ANY';
  const rule = new ValidCountry(true);
  const result = new ValidationResult();

  rule.Validate(value, '', result);

  expect(result.Valid).toBe(true);
});

it('Should accept for valid country', () => {
  const value = 'CANADA';
  const rule = new ValidCountry();
  const result = new ValidationResult();

  rule.Validate(value, '', result);

  expect(result.Valid).toBe(true);
});
