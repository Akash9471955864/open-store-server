import {ValidationResult} from '../ValidationResult';
import {ValidationEntry} from '../ValidationEntry';
import {IValidationRule} from './IValidationRule';

export class ValidID implements IValidationRule<string> {
  uuid_regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  Validate(
    value: string | undefined,
    property: string,
    result: ValidationResult
  ): void {
    if (value === undefined) {
      result.addEntry(
        ValidationEntry.fromError(property, 'String cannot be undefined')
      );
    } else if (!this.uuid_regex.test(value)) {
      result.addEntry(
        ValidationEntry.fromError(
          property,
          'String does not match expected pattern'
        )
      );
    }
  }
}
