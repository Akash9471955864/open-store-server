import {ValidationResult} from '../ValidationResult';
import {IValidationRule} from './IValidationRule';
import {ValidationEntry} from '../ValidationEntry';

export class All<T extends Array<any>> implements IValidationRule<T> {
  static ApplyWithSelector<X extends Array<Y>, Y, Z>(
    rule: IValidationRule<Z>,
    selector: (a: Y) => Z
  ): All<X> {
    return new All(rule, selector);
  }

  static Apply<T extends Array<X>, X>(rule: IValidationRule<X>): All<T> {
    return new All(rule);
  }

  Validate(
    value: T | undefined,
    property: string,
    result: ValidationResult
  ): void {
    if (value === undefined) return;
    if (!(value instanceof Array)) {
      result.addEntry(
        ValidationEntry.fromError(property, 'It is not an Array')
      );
      return;
    }

    value.forEach((item, i) => {
      if (this.selector !== undefined) {
        item = this.selector(item);
      }
      this.rule.Validate(item, property + `[${i}]`, result);
    });
  }

  private constructor(
    private rule: IValidationRule<any>,
    private selector?: (a: any) => any
  ) {}
}
