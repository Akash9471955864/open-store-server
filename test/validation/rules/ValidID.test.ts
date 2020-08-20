import {ValidationResult} from '../../../src/validation/ValidationResult';
import {ValidID} from '../../../src/validation/rules/ValidID';

test('It should fail for invalid IDs', () => {
  const id = 'NOT-VALID';
  const rule = new ValidID();
  const result = new ValidationResult();

  rule.Validate(id, '', result);

  expect(result.Valid).toBe(false);
});

test('It should fail for undefined IDs', () => {
  const id = undefined;
  const rule = new ValidID();
  const result = new ValidationResult();

  rule.Validate(id, '', result);

  expect(result.Valid).toBe(false);
});

test('It should succeed for valid IDs', () => {
  const id = 'a44ddc15-a1ea-43e4-88ce-48baea62a373';
  const rule = new ValidID();
  const result = new ValidationResult();

  rule.Validate(id, '', result);

  expect(result.Valid).toBe(true);
});
