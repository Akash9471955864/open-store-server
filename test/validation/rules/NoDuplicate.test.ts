import {ValidationResult} from '../../../src/validation/ValidationResult';
import {NoDuplicate} from '../../../src/validation/rules/NoDuplicate';

test('It should fail if there are two of the same item', () => {
  const item1 = 'A';
  const item2 = 'A';
  const items = [item1, item2];
  const rule = new NoDuplicate();

  const result = new ValidationResult();
  rule.Validate(items, '', result);

  expect(result.Valid).toBe(false);
});

test('It should fail if there are two of the same item after selector', () => {
  const item1 = ['A', 'SAME'];
  const item2 = ['B', 'SAME'];
  const items = [item1, item2];
  const rule = new NoDuplicate((x: Array<any>) => x[1]);

  const result = new ValidationResult();
  rule.Validate(items, '', result);

  expect(result.Valid).toBe(false);
});

test('It should succeed if there are no two of the same item', () => {
  const item1 = ['A', 'SAME'];
  const item2 = ['B', 'SAME'];
  const items = [item1, item2];
  const rule = new NoDuplicate();

  const result = new ValidationResult();
  rule.Validate(items, '', result);

  expect(result.Valid).toBe(true);
});

test('It should succeed if there are no two of the same item after selector', () => {
  const item1 = ['A', 'SAME'];
  const item2 = ['B', 'SAME'];
  const items = [item1, item2];
  const rule = new NoDuplicate((x: Array<any>) => x[0]);

  const result = new ValidationResult();
  rule.Validate(items, '', result);

  expect(result.Valid).toBe(true);
});
