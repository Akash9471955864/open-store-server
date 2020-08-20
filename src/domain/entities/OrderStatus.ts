export enum OrderStatus {
  CANCELLED,
  DELIVERED,
  COMPLETE,
  RESERVED,
  CREATED,
  SHIPPED,
}

export function fromString(value: string): OrderStatus | undefined {
  value = value.toUpperCase();
  if (value === 'CANCELLED') return OrderStatus.CANCELLED;
  if (value === 'DELIVERED') return OrderStatus.DELIVERED;
  if (value === 'RESERVED') return OrderStatus.RESERVED;
  if (value === 'COMPLETE') return OrderStatus.COMPLETE;
  if (value === 'CREATED') return OrderStatus.CREATED;
  if (value === 'SHIPPED') return OrderStatus.SHIPPED;
  return undefined;
}

export function toString(value: OrderStatus): string {
  switch (value) {
    case OrderStatus.CANCELLED:
      return 'CANCELLED';
    case OrderStatus.DELIVERED:
      return 'DELIVERED';
    case OrderStatus.RESERVED:
      return 'RESERVED';
    case OrderStatus.COMPLETE:
      return 'COMPLETE';
    case OrderStatus.CREATED:
      return 'CREATED';
    case OrderStatus.SHIPPED:
      return 'SHIPPED';
  }
}
