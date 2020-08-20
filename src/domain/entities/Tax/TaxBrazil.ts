import {Tax} from './Tax';

export class TaxBrazil extends Tax {
  private validateValue(value: number) {
    if (value < 0) {
      throw new Error('Harmonized tax must be greater than or equal to zero');
    }
  }

  public getTotal(): number {
    return this.value;
  }

  get Value() {
    return this.value;
  }

  constructor(protected value: number) {
    super();
    this.validateValue(value);
  }
}
