import {fromString, Country} from '../../domain/entities/Country';
import {ValidationResult} from '../ValidationResult';
import {ValidationEntry} from '../ValidationEntry';
import {IValidationRule} from './IValidationRule';

export class ValidPostalCode
  implements IValidationRule<[string | undefined, string | undefined]> {
  private ValidateCanada(
    value: string,
    property: string,
    result: ValidationResult
  ) {
    const regex = /^(?:[ABCEGHJ-NPRSTVXY]\d[A-Z][ -]?\d[A-Z]\d)$/i;
    if (!regex.test(value)) {
      result.addEntry(
        ValidationEntry.fromError(property, 'Invalid postal code for country')
      );
    }
  }

  private ValidateBrazil(
    value: string,
    property: string,
    result: ValidationResult
  ) {
    const regex = /^\d{5}-?\d{3}$/;
    if (!regex.test(value)) {
      result.addEntry(
        ValidationEntry.fromError(property, 'Invalid postal code for country')
      );
    }
  }

  Validate(
    value: [string | undefined, string | undefined] | undefined,
    property: string,
    result: ValidationResult
  ): void {
    // Invalid if tuple is undefined
    if (value === undefined) {
      result.addEntry(
        ValidationEntry.fromError(property, 'String cannot be undefined')
      );
      return;
    }

    // Invalid if postal code is undefined
    const postalCode = value[0];
    if (postalCode === undefined) {
      result.addEntry(
        ValidationEntry.fromError(property, 'String cannot be undefined')
      );
      return;
    }

    // Invalid if country is undefined
    if (value[1] === undefined) {
      result.addEntry(ValidationEntry.fromError(property, 'Invalid country'));
      return;
    }

    const country = fromString(value[1]);

    // Individual validators per country
    switch (country) {
      case Country.CANADA:
        this.ValidateCanada(postalCode, property, result);
        break;
      case Country.BRAZIL:
        this.ValidateBrazil(postalCode, property, result);
        break;
      case Country.ANY:
      case undefined:
        result.addEntry(ValidationEntry.fromError(property, 'Invalid country'));
        break;
    }
  }
}
