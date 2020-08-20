import {ValidPostalCode} from '../../../src/validation/rules/ValidPostalCode';
import {ValidationResult} from '../../../src/validation/ValidationResult';

it('Should fail for undefined tuple', () => {
  const tuple = undefined;
  const rule = new ValidPostalCode();
  const result = new ValidationResult();

  rule.Validate(tuple, '', result);

  expect(result.Valid).toBe(false);
});

it('Should fail for undefined postal code', () => {
  const tuple = <[undefined, string]>[undefined, 'BRAZIL'];
  const result = new ValidationResult();
  const rule = new ValidPostalCode();

  rule.Validate(tuple, '', result);

  expect(result.Valid).toBe(false);
});

it('Should fail for undefined country', () => {
  const tuple = <[string, undefined]>['90480-020', undefined];
  const result = new ValidationResult();
  const rule = new ValidPostalCode();

  rule.Validate(tuple, '', result);

  expect(result.Valid).toBe(false);
});

it('Should fail for invalid country', () => {
  const tuple = <[string, string]>['90480-020', 'ISLAND'];
  const result = new ValidationResult();
  const rule = new ValidPostalCode();

  rule.Validate(tuple, '', result);

  expect(result.Valid).toBe(false);
});

it('Should fail for "ANY" country', () => {
  const tuple = <[string, string]>['90480-020', 'ANY'];
  const result = new ValidationResult();
  const rule = new ValidPostalCode();

  rule.Validate(tuple, '', result);

  expect(result.Valid).toBe(false);
});

it('Should fail for invalid postal code for BRAZIL', () => {
  const tuple = <[string, string]>['90A80-020', 'BRAZIL'];
  const result = new ValidationResult();
  const rule = new ValidPostalCode();

  rule.Validate(tuple, '', result);

  expect(result.Valid).toBe(false);
});

it('Should fail for invalid postal code for CANADA', () => {
  const tuple = <[string, string]>['BBB-BBB', 'CANADA'];
  const result = new ValidationResult();
  const rule = new ValidPostalCode();

  rule.Validate(tuple, '', result);

  expect(result.Valid).toBe(false);
});

it('Should succeed for valid postal code for BRAZIL', () => {
  const tuple = <[string, string]>['90480-020', 'BRAZIL'];
  const result = new ValidationResult();
  const rule = new ValidPostalCode();

  rule.Validate(tuple, '', result);

  expect(result.Valid).toBe(true);
});

it('Should succeed for valid postal code for CANADA', () => {
  const tuple = <[string, string]>['B1H-1X1', 'CANADA'];
  const result = new ValidationResult();
  const rule = new ValidPostalCode();

  rule.Validate(tuple, '', result);

  expect(result.Valid).toBe(true);
});
