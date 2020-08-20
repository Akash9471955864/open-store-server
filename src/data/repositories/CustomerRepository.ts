import {ICustomerRepository} from '../../domain/repositories/ICustomerRepository';
import {IDataContext} from '../../crosscutting/dataContext/IDataContext';
import {Customer} from '../../domain/entities/Customer';
import {TYPES} from '../../crosscutting/di/di_types';
import {injectable, inject} from 'inversify';
import {QueryResult} from 'pg';

@injectable()
export class CustomerRepository implements ICustomerRepository {
  private MapToCustomer(customer: any): Customer {
    const email = customer.EMAIL;
    const name = customer.NAME;
    return new Customer(email, name);
  }

  async Retrieve(id: string): Promise<Customer | undefined> {
    const select = `SELECT * FROM "CUSTOMER"`;
    const where = `WHERE "ID" = $1`;

    const query = `${select} ${where}`;
    const values = [id];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to retrieve customer');
    }

    if (result.rowCount === 0) return undefined;
    const row = result.rows[0];

    return this.MapToCustomer(row);
  }

  private InsertValues(customer: Customer): Array<string> {
    return [customer.Email, customer.Name];
  }

  async Insert(customer: Customer): Promise<string> {
    const _insert = `INSERT INTO "CUSTOMER"`;
    const _params = `("EMAIL", "NAME")`;
    const _values = `VALUES ($1, $2)`;
    const _return = `RETURNING "ID"`;

    const query = `${_insert} ${_params} ${_values} ${_return}`;
    const values = this.InsertValues(customer);

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to insert cusomer');
    }

    return result.rows[0].ID;
  }

  constructor(@inject(TYPES.IDataContext) private data: IDataContext) {}
}
