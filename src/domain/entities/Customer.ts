export class Customer {
  private validateEmail(value: string) {
    const regex = /^\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b$/gim;
    if (!regex.test(value)) throw new Error('Invalid format for email');
  }

  private validateName(value: string) {
    if (value.trim().length < 2) {
      throw new Error('Name must have at least two non-white characters');
    }
  }

  get Email() {
    return this.email;
  }

  get Name() {
    return this.name;
  }

  constructor(private email: string, private name: string) {
    this.validateEmail(email);
    this.validateName(name);
  }
}
