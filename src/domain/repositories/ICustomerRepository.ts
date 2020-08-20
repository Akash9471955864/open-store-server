import {Customer} from '../entities/Customer';

export interface ICustomerRepository {
  Retrieve(id: string): Promise<Customer | undefined>;
  Insert(customer: Customer): Promise<string>;
}
