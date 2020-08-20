import {ValidEmailAddress} from '../../../src/validation/rules/ValidEmailAddress';
import {ValidationResult} from '../../../src/validation/ValidationResult';

test('Undefined string should result in failed validation', () => {
  const email = undefined;
  const rule = new ValidEmailAddress();
  const result = new ValidationResult();

  rule.Validate(email, '', result);

  expect(result.Valid).toBe(false);
});

test('Empty string should result in failed validation', () => {
  const email = '';
  const rule = new ValidEmailAddress();
  const result = new ValidationResult();

  rule.Validate(email, '', result);

  expect(result.Valid).toBe(false);
});

test('Invalid email string should result in failed validation', () => {
  const email = 'not@valid@valid.com';
  const rule = new ValidEmailAddress();
  const result = new ValidationResult();

  rule.Validate(email, '', result);

  expect(result.Valid).toBe(false);
});

test('Valid email address should result in successful validation', () => {
  const email = 'is@valid.com';
  const rule = new ValidEmailAddress();
  const result = new ValidationResult();

  rule.Validate(email, '', result);

  expect(result.Valid).toBe(true);
});
