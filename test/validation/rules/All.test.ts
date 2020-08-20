import {IValidationRule} from '../../../src/validation/rules/IValidationRule';
import {ValidationResult} from '../../../src/validation/ValidationResult';
import {All} from '../../../src/validation/rules/All';

class SampleRule implements IValidationRule<number> {
  Validate = jest.fn();
}

test('It should validate the rule as many times as there are items', () => {
  const result = new ValidationResult();
  const values = [1, 2, 3, 4, 5];
  const rule = new SampleRule();

  const all = All.Apply(rule);
  all.Validate(values, '', result);

  expect(rule.Validate).toHaveBeenCalledTimes(5);
});

test('It should have been called with the values as parameters', () => {
  const result = new ValidationResult();
  const rule = new SampleRule();
  const values = [1, 2, 3];

  const all = All.Apply(rule);
  all.Validate(values, '', result);

  expect(rule.Validate).toHaveBeenCalledWith(1, '[0]', result);
  expect(rule.Validate).toHaveBeenCalledWith(2, '[1]', result);
  expect(rule.Validate).toHaveBeenCalledWith(3, '[2]', result);
});

test('It should have been called with the selector values as parameters', () => {
  const result = new ValidationResult();
  const rule = new SampleRule();
  const values = [1, 2, 3];

  const selector = (x: number) => x ** 2;

  const all = All.ApplyWithSelector(rule, selector);
  all.Validate(values, '', result);

  expect(rule.Validate).toHaveBeenCalledWith(1, '[0]', result);
  expect(rule.Validate).toHaveBeenCalledWith(4, '[1]', result);
  expect(rule.Validate).toHaveBeenCalledWith(9, '[2]', result);
});

test('It should not fail for undefined array of elements', () => {
  const result = new ValidationResult();
  const rule = new SampleRule();
  const values = undefined;

  const all = All.Apply(rule);
  all.Validate(values, '', result);

  expect(rule.Validate).toHaveBeenCalledTimes(0);
  expect(result.Valid).toBe(true);
});
