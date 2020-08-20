import {ValidationResult} from '../../src/validation/ValidationResult';
import {ValidationEntry} from '../../src/validation/ValidationEntry';

test('Should be invalid if at least one entry is not valid', () => {
  const validationResult = new ValidationResult();
  const entry1 = ValidationEntry.fromValidationResult('', validationResult);
  const entry2 = ValidationEntry.fromError('', '');

  const result = new ValidationResult();
  result.addEntry(entry1);
  result.addEntry(entry2);

  expect(result.Valid).toBe(false);
});

test('Should be valid if all entries are valid', () => {
  const validationResult = new ValidationResult();
  const entry1 = ValidationEntry.fromValidationResult('', validationResult);
  const entry2 = ValidationEntry.fromValidationResult('', validationResult);

  const result = new ValidationResult();
  result.addEntry(entry1);
  result.addEntry(entry2);

  expect(result.Valid).toBe(true);
});
