export enum BillingStatus {
  CANCELLED,
  CONFIRMED,
  PENDING,
}

export function fromString(value: string): BillingStatus | undefined {
  value = value.toUpperCase();
  if (value === 'CANCELLED') return BillingStatus.CANCELLED;
  if (value === 'CONFIRMED') return BillingStatus.CONFIRMED;
  if (value === 'PENDING') return BillingStatus.PENDING;
  return undefined;
}

export function toString(value: BillingStatus): string {
  switch (value) {
    case BillingStatus.CANCELLED:
      return 'CANCELLED';
    case BillingStatus.CONFIRMED:
      return 'CONFIRMED';
    case BillingStatus.PENDING:
      return 'PENDING';
  }
}
