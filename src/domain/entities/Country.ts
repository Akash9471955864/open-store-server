export enum Country {
  CANADA,
  BRAZIL,
  ANY,
}

export function fromString(value: string): Country | undefined {
  value = value.toUpperCase();
  if (value === 'CANADA') return Country.CANADA;
  if (value === 'BRAZIL') return Country.BRAZIL;
  if (value === 'ANY') return Country.ANY;
  return undefined;
}

export function toString(value: Country): string {
  switch (value) {
    case Country.CANADA:
      return 'CANADA';
    case Country.BRAZIL:
      return 'BRAZIL';
    case Country.ANY:
      return 'ANY';
  }
}
