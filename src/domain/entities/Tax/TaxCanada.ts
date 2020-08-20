import {Tax} from './Tax';

export class TaxCanada extends Tax {
  private validateHarmonizedTax(value: number) {
    if (value < 0) {
      throw new Error('Harmonized tax must be greater than or equal to zero');
    }
  }

  private validateProvincialTax(value: number) {
    if (value < 0) {
      throw new Error('Provincial tax must be greater than or equal to zero');
    }
  }

  private validateFederalTax(value: number) {
    if (value < 0) {
      throw new Error('Federal tax must be greater than or equal to zero');
    }
  }

  public getTotal(): number {
    if (this.isHarmonized) return this.harmonizedTax;
    return this.provincialTax + this.federalTax;
  }

  get IsHarmonized() {
    return this.isHarmonized;
  }

  get HarmonizedTax() {
    return this.harmonizedTax;
  }

  get ProvincialTax() {
    return this.provincialTax;
  }

  get FederalTax() {
    return this.federalTax;
  }

  constructor(
    protected isHarmonized: boolean,
    protected harmonizedTax: number,
    protected provincialTax: number,
    protected federalTax: number
  ) {
    super();
    this.validateHarmonizedTax(harmonizedTax);
    this.validateProvincialTax(provincialTax);
    this.validateFederalTax(federalTax);
  }
}
