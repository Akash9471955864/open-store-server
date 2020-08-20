import {IAddressRepository} from '../../domain/repositories/IAddressRepository';
import {IDataContext} from '../../crosscutting/dataContext/IDataContext';
import {toString, fromString} from '../../domain/entities/Country';
import {Address} from '../../domain/entities/Address';
import {TYPES} from '../../crosscutting/di/di_types';
import {injectable, inject} from 'inversify';
import {QueryResult} from 'pg';

@injectable()
export class AddressRepository implements IAddressRepository {
  private MapToAddress(address: any): Address {
    const country = fromString(address.COUNTRY);
    const postal_code = address.POSTAL_CODE;
    const street = address.STREET;
    const state = address.STATE;
    const city = address.CITY;

    return new Address(postal_code, country!, street, state, city);
  }

  async Retrieve(id: string): Promise<Address | undefined> {
    const select = `SELECT * FROM "ADDRESS"`;
    const where = `WHERE "ID" = $1`;

    const query = `${select} ${where}`;
    const values = [id];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to retrieve address');
    }

    if (result.rowCount === 0) return undefined;
    const row = result.rows[0];

    return this.MapToAddress(row);
  }

  private InsertValues(address: Address): Array<string> {
    const country = toString(address.Country);
    return [
      address.City,
      address.State,
      address.Street,
      country,
      address.PostalCode,
    ];
  }

  async Insert(address: Address): Promise<string> {
    const _insert = `INSERT INTO "ADDRESS"`;
    const _params = `("CITY","STATE","STREET","COUNTRY","POSTAL_CODE")`;
    const _values = `VALUES ($1,$2,$3,$4,$5)`;
    const _return = `RETURNING "ID"`;

    const query = `${_insert} ${_params} ${_values} ${_return}`;
    const values = this.InsertValues(address);

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to insert address');
    }

    return result.rows[0].ID;
  }

  constructor(@inject(TYPES.IDataContext) private data: IDataContext) {}
}
