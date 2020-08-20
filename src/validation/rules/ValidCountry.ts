import {fromString, Country} from '../../domain/entities/Country';
import {ValidationResult} from '../ValidationResult';
import {ValidationEntry} from '../ValidationEntry';
import {IValidationRule} from './IValidationRule';

export class ValidCountry implements IValidationRule<string> {
  Validate(
    value: string | undefined,
    property: string,
    result: ValidationResult
  ): void {
    if (value === undefined) {
      result.addEntry(
        ValidationEntry.fromError(property, 'String is not a valid country')
      );
      return;
    }

    const country = fromString(value);

    if (country === undefined) {
      result.addEntry(
        ValidationEntry.fromError(property, 'String is not a valid country')
      );
    } else if (country === Country.ANY && this.allowAny === false) {
      result.addEntry(
        ValidationEntry.fromError(property, 'ANY not allowed in this context')
      );
    }
  }

  constructor(private allowAny = false) {}
}
