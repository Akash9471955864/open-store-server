import {fromString} from '../../domain/entities/ShippingType';
import {ValidationResult} from '../ValidationResult';
import {ValidationEntry} from '../ValidationEntry';
import {IValidationRule} from './IValidationRule';

export class ValidShippingType implements IValidationRule<string> {
  Validate(
    value: string | undefined,
    property: string,
    result: ValidationResult
  ): void {
    if (value === undefined) {
      result.addEntry(
        ValidationEntry.fromError(
          property,
          'String is not a valid shipping type'
        )
      );
      return;
    }

    const shippingType = fromString(value);

    if (shippingType === undefined) {
      result.addEntry(
        ValidationEntry.fromError(
          property,
          'String is not a valid shipping type'
        )
      );
    }
  }

  constructor() {}
}
