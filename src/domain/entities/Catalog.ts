import {CatalogEntry} from './CatalogEntry';
import {Country} from './Country';

export class Catalog {
  private validateDate(startDate: Date, endDate: Date) {
    if (startDate > endDate) {
      throw new Error('Start date cannot be after end date');
    }
    if (startDate.getTime() === endDate.getTime()) {
      throw new Error('Start and end dates cannot be the same');
    }
  }

  private validateEntries(entries: CatalogEntry[]) {
    const products = new Set();
    for (const entry of entries) {
      if (products.has(entry.Product.ID)) {
        throw new Error('Cannot have duplicate entries in catalog');
      }
      products.add(entry.Product.ID);
    }
  }

  private validateName(value: string) {
    if (value.trim().length < 2) {
      throw new Error('Name must have at least two characters');
    }
  }

  get StartDate() {
    return this.startDate;
  }

  get EndDate() {
    return this.endDate;
  }

  get Entries() {
    return this.entries;
  }

  get Country() {
    return this.country;
  }

  get Name() {
    return this.name;
  }

  constructor(
    protected entries: CatalogEntry[],
    protected country: Country,
    protected startDate: Date,
    protected endDate: Date,
    protected name: string
  ) {
    this.validateDate(startDate, endDate);
    this.validateEntries(entries);
    this.validateName(name);
  }
}
