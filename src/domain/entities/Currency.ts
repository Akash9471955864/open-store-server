export enum Currency {
  CAD,
  BRL,
}

export function fromString(value: string): Currency | undefined {
  value = value.toUpperCase();
  if (value === 'CAD') return Currency.CAD;
  if (value === 'BRL') return Currency.BRL;
  return undefined;
}

export function toString(value: Currency): string {
  switch (value) {
    case Currency.CAD:
      return 'CAD';
    case Currency.BRL:
      return 'BRL';
  }
}
