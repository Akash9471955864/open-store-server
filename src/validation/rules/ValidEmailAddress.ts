import {ValidationResult} from '../ValidationResult';
import {ValidationEntry} from '../ValidationEntry';
import {IValidationRule} from './IValidationRule';

export class ValidEmailAddress implements IValidationRule<string> {
  Validate(
    value: string | undefined,
    property: string,
    result: ValidationResult
  ): void {
    if (value === undefined) {
      result.addEntry(
        ValidationEntry.fromError(property, `String cannot be undefined`)
      );
      return;
    }

    const regex = /^\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b$/gim;

    if (!regex.test(value)) {
      result.addEntry(
        ValidationEntry.fromError(
          property,
          'String is not a valid email address'
        )
      );
    }
  }

  constructor() {}
}
