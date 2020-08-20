import {ValidationResult} from '../../src/validation/ValidationResult';
import {ValidationEntry} from '../../src/validation/ValidationEntry';

test('Property should return provided value', () => {
  const property = 'PROPERTY';
  const error = 'ERROR';
  const entry = ValidationEntry.fromError(property, error);

  expect(entry.Property).toEqual(property);
});

test('Property Error should return provided value', () => {
  const property = 'PROPERTY';
  const error = 'ERROR';
  const entry = ValidationEntry.fromError(property, error);

  expect(entry.Error).toEqual(error);
});

test('Property Result return provided value', () => {
  const property = 'PROPERTY';
  const result = new ValidationResult();
  const entry = ValidationEntry.fromValidationResult(property, result);

  expect(entry.Result).toEqual(result);
});
