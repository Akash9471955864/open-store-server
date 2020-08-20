import {TaxCanada} from '../../../../src/domain/entities/Tax/TaxCanada';

var harmonizedTax: number;
var provincialTax: number;
var federalTax: number;

beforeEach(() => {
  harmonizedTax = 10;
  provincialTax = 5;
  federalTax = 1;
});

test('Should not accept negative harmonized tax', () => {
  harmonizedTax = -1;
  expect(
    () => new TaxCanada(true, harmonizedTax, provincialTax, federalTax)
  ).toThrowError();
});

test('Should not accept negative provincial tax', () => {
  provincialTax = -1;
  expect(
    () => new TaxCanada(true, harmonizedTax, provincialTax, federalTax)
  ).toThrowError();
});

test('Should not accept negative federal tax', () => {
  federalTax = -1;
  expect(
    () => new TaxCanada(true, harmonizedTax, provincialTax, federalTax)
  ).toThrowError();
});

test('Total for harmonized tax should be harmonized tax', () => {
  const tax = new TaxCanada(true, harmonizedTax, provincialTax, federalTax);
  expect(tax.getTotal()).toEqual(harmonizedTax);
});

test('Total for non-harmonized tax should be the sum of provincial and federal taxes', () => {
  const tax = new TaxCanada(false, harmonizedTax, provincialTax, federalTax);
  expect(tax.getTotal()).toEqual(provincialTax + federalTax);
});

test('Property IsHarmonized should return provided value', () => {
  const tax = new TaxCanada(true, harmonizedTax, provincialTax, federalTax);
  expect(tax.IsHarmonized).toEqual(true);
});

test('Property HarmonizedTax should return provided value', () => {
  const tax = new TaxCanada(true, harmonizedTax, provincialTax, federalTax);
  expect(tax.HarmonizedTax).toEqual(harmonizedTax);
});

test('Property ProvincialTax should return provided value', () => {
  const tax = new TaxCanada(true, harmonizedTax, provincialTax, federalTax);
  expect(tax.ProvincialTax).toEqual(provincialTax);
});

test('Property FederalTax should return provided value', () => {
  const tax = new TaxCanada(true, harmonizedTax, provincialTax, federalTax);
  expect(tax.FederalTax).toEqual(federalTax);
});
