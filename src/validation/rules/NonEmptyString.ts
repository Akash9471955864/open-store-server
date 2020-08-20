import {ValidationResult} from '../ValidationResult';
import {ValidationEntry} from '../ValidationEntry';
import {IValidationRule} from './IValidationRule';

export class NonEmptyString implements IValidationRule<string> {
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

    value = value.trim();

    if (value.length < this.minimumCharacters) {
      result.addEntry(
        ValidationEntry.fromError(
          property,
          `String must have at least ${this.minimumCharacters} non-white characters`
        )
      );
    }
  }

  constructor(private minimumCharacters: number = 1) {}
}
