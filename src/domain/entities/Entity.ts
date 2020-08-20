export abstract class Entity {
  set ID(value: string | undefined) {
    if (value === undefined) throw new Error('ID cannot be set as undefined');
    if (this.id) throw new Error('Cannot re-define ID for Address');
    this.id = value;
  }

  get ID() {
    return this.id;
  }

  constructor(protected id?: string) {}
}
