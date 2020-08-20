import {ValidShippingType} from '../../../src/validation/rules/ValidShippingType';
import {ValidationResult} from '../../../src/validation/ValidationResult';

it('Should fail for undefined value', () => {
  const value = undefined;
  const rule = new ValidShippingType();
  const result = new ValidationResult();

  rule.Validate(value, '', result);

  expect(result.Valid).toBe(false);
});

it('Should fail for invalid shipping type', () => {
  const value = 'SUPER-EXPRESS';
  const rule = new ValidShippingType();
  const result = new ValidationResult();

  rule.Validate(value, '', result);

  expect(result.Valid).toBe(false);
});

it('Should accept for valid shipping type', () => {
  const value = 'EXPRESS';
  const rule = new ValidShippingType();
  const result = new ValidationResult();

  rule.Validate(value, '', result);

  expect(result.Valid).toBe(true);
});
