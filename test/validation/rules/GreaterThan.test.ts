import {ValidationResult} from '../../../src/validation/ValidationResult';
import {GreaterThan} from '../../../src/validation/rules/GreaterThan';

test('It should fail for undefined values', () => {
  const value = undefined;
  const rule = new GreaterThan(0);
  const result = new ValidationResult();

  rule.Validate(value, '', result);

  expect(result.Valid).toBe(false);
});

test('It should fail for values smaller than expected', () => {
  const value = 1;
  const rule = new GreaterThan(5);
  const result = new ValidationResult();

  rule.Validate(value, '', result);

  expect(result.Valid).toBe(false);
});

test('It should fail for value equal to expected', () => {
  const value = 1;
  const rule = new GreaterThan(1);
  const result = new ValidationResult();

  rule.Validate(value, '', result);

  expect(result.Valid).toBe(false);
});

test('It should succeed for values greater than expected', () => {
  const value = 5;
  const rule = new GreaterThan(1);
  const result = new ValidationResult();

  rule.Validate(value, '', result);

  expect(result.Valid).toBe(true);
});
