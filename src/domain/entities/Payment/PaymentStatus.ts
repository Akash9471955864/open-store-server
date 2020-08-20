export enum PaymentStatus {
  AUTHORIZED,
  CANCELLED,
  CAPTURED,
  CREATED,
}

export function fromString(value: string): PaymentStatus | undefined {
  value = value.toUpperCase();
  if (value === 'AUTHORIZED') return PaymentStatus.AUTHORIZED;
  if (value === 'CANCELLED') return PaymentStatus.CANCELLED;
  if (value === 'CAPTURED') return PaymentStatus.CAPTURED;
  if (value === 'CREATED') return PaymentStatus.CREATED;

  return undefined;
}

export function toString(value: PaymentStatus): string {
  switch (value) {
    case PaymentStatus.AUTHORIZED:
      return 'AUTHORIZED';
    case PaymentStatus.CANCELLED:
      return 'CANCELLED';
    case PaymentStatus.CAPTURED:
      return 'CAPTURED';
    case PaymentStatus.CREATED:
      return 'CREATED';
  }
}
