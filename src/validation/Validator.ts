import {IValidationRule} from './rules/IValidationRule';
import {ValidationResult} from './ValidationResult';
import {injectable} from 'inversify';

@injectable()
export abstract class Validator<T> {
  private rules: Array<IValidationRule<any>>;
  private selectors: Array<(a: T) => any>;
  private properties: Array<string>;

  Validate(value: T): ValidationResult {
    const result = new ValidationResult();

    this.rules.forEach((rule, index) => {
      const param = this.selectors[index](value);
      const property = this.properties[index];
      rule.Validate(param, property, result);
    });

    return result;
  }

  protected AddRule<X>(
    rule: IValidationRule<X>,
    selector: (a: T) => X,
    property: string
  ): void {
    this.properties.push(property);
    this.selectors.push(selector);
    this.rules.push(rule);
  }

  constructor() {
    this.rules = new Array<IValidationRule<any>>();
    this.selectors = new Array<(a: T) => any>();
    this.properties = new Array<string>();
  }
}
