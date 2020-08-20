import {ValidationEntry} from './ValidationEntry';

export class ValidationResult {
  private entries: ValidationEntry[];

  get Valid(): boolean {
    return this.entries.every(x => x.Result !== undefined && x.Result.Valid);
  }

  addEntry(entry: ValidationEntry) {
    this.entries.push(entry);
  }

  constructor() {
    this.entries = new Array<ValidationEntry>();
  }
}
