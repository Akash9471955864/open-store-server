export enum ShippingType {
  'REGULAR',
  'EXPRESS',
  'INTERNATIONAL',
}

export function fromString(value: string): ShippingType | undefined {
  value = value.toUpperCase();
  if (value === 'INTERNATIONAL') return ShippingType.INTERNATIONAL;
  if (value === 'REGULAR') return ShippingType.REGULAR;
  if (value === 'EXPRESS') return ShippingType.EXPRESS;
  return undefined;
}

export function toString(value: ShippingType): string {
  switch (value) {
    case ShippingType.EXPRESS:
      return 'EXPRESS';
    case ShippingType.REGULAR:
      return 'REGULAR';
    case ShippingType.INTERNATIONAL:
      return 'INTERNATIONAL';
  }
}
