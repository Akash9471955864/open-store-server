import {ValidationResult} from '../ValidationResult';
import {ValidationEntry} from '../ValidationEntry';
import {IValidationRule} from './IValidationRule';

export class NoDuplicate<T extends Array<any>> implements IValidationRule<T> {
  Validate(
    value: T | undefined,
    property: string,
    result: ValidationResult
  ): void {
    if (value === undefined) return;
    if (!(value instanceof Array)) {
      result.addEntry(
        ValidationEntry.fromError(property, 'It is not an Array')
      );
      return;
    }

    const control = new Set<any>();
    var flag = true;

    value.forEach(item => {
      if (this.selector !== undefined) {
        item = this.selector(item);
      }

      if (control.has(item)) flag = false;
      control.add(item);
    });

    if (!flag) {
      result.addEntry(
        ValidationEntry.fromError(property, 'Cannot contain duplicate value')
      );
    }
  }

  constructor(private selector?: (a: any) => any) {}
}
