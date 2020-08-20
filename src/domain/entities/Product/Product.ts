import {Entity} from '../Entity';

export abstract class Product extends Entity {
  private validateDescription(value: string) {
    if (value.trim().length < 5) {
      throw new Error('Description must have at least 5 non-blank characters');
    }
  }

  private validateName(value: string) {
    if (value.trim().length < 3) {
      throw new Error('Name must have at least 3 non-blank characters');
    }
  }

  get Description() {
    return this.description;
  }

  get Name() {
    return this.name;
  }

  constructor(private description: string, private name: string, id?: string) {
    super(id);
    this.validateDescription(description);
    this.validateName(name);
  }
}
