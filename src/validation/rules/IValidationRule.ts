import {ValidationResult} from '../ValidationResult';

export interface IValidationRule<T> {
  Validate(
    value: T | undefined,
    property: string,
    result: ValidationResult
  ): void;
}
