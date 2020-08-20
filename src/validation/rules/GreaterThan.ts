import {ValidationResult} from '../ValidationResult';
import {IValidationRule} from './IValidationRule';
import {ValidationEntry} from '../ValidationEntry';

export class GreaterThan implements IValidationRule<number> {
  Validate(
    value: number | undefined,
    property: string,
    result: ValidationResult
  ): void {
    if (value === undefined) {
      result.addEntry(
        ValidationEntry.fromError(property, 'Value cannot be undefined')
      );
    } else if (value <= this.value) {
      result.addEntry(
        ValidationEntry.fromError(
          property,
          `Has to be greater than ${this.value}`
        )
      );
    }
  }

  constructor(private value: number) {}
}
