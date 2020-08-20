import {ValidationResult} from './ValidationResult';

export class ValidationEntry {
  public static fromError(property: string, error: string): ValidationEntry {
    return new ValidationEntry(property, error, undefined);
  }

  public static fromValidationResult(
    property: string,
    validationResult: ValidationResult
  ): ValidationEntry {
    return new ValidationEntry(property, undefined, validationResult);
  }

  get Property() {
    return this.property;
  }

  get Result() {
    return this.result;
  }

  get Error() {
    return this.error;
  }

  private constructor(
    private property: string,
    private error?: string,
    private result?: ValidationResult
  ) {}
}
