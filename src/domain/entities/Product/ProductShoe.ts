import {Product} from './Product';

export class ProductShoe extends Product {
  private validateArtist(value: string) {
    if (value.trim().length < 1) {
      throw new Error('Artist must have at least one non-blank characters');
    }
  }

  get Artist(): string {
    return this.artist;
  }

  constructor(
    private artist: string,
    description: string,
    name: string,
    id?: string
  ) {
    super(description, name, id);
    this.validateArtist(artist);
  }
}
