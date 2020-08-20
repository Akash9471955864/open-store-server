import {Country} from './Country';
import {Entity} from './Entity';

export class Address extends Entity {
  private validatePostalCode(value: string) {
    if (value.trim().length < 2) {
      throw new Error('Postal code must have at least two characters');
    }
  }

  private validateStreet(value: string) {
    if (value.trim().length < 2) {
      throw new Error('Postal code must have at least two characters');
    }
  }

  private validateState(value: string) {
    if (value.trim().length < 2) {
      throw new Error('Postal code must have at least two characters');
    }
  }

  private validateCity(value: string) {
    if (value.trim().length < 2) {
      throw new Error('Postal code must have at least two characters');
    }
  }

  get PostalCode() {
    return this.postalCode;
  }

  get Country() {
    return this.country;
  }

  get Street() {
    return this.street;
  }

  get State() {
    return this.state;
  }

  get City() {
    return this.city;
  }

  constructor(
    private postalCode: string,
    private country: Country,
    private street: string,
    private state: string,
    private city: string,
    id?: string
  ) {
    super(id);
    this.validatePostalCode(postalCode);
    this.validateStreet(street);
    this.validateState(state);
    this.validateCity(city);
  }
}
