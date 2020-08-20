import {ITaxBrazilRepository} from '../../../domain/repositories/ITaxRepository/ITaxBrazilRepository';
import {IDataContext} from '../../../crosscutting/dataContext/IDataContext';
import {TaxBrazil} from '../../../domain/entities/Tax/TaxBrazil';
import {TYPES} from '../../../crosscutting/di/di_types';
import {injectable, inject} from 'inversify';
import {QueryResult} from 'pg';

@injectable()
export class TaxBrazilRepository implements ITaxBrazilRepository {
  private MapToTaxBrazil(tax: any): TaxBrazil {
    const value = Number.parseInt(tax.VALUE);
    return new TaxBrazil(value);
  }

  async Retrieve(id: string): Promise<TaxBrazil | undefined> {
    const select = `SELECT * FROM "TAX_BRAZIL"`;
    const where = `WHERE "ID" = $1`;

    const query = `${select} ${where}`;
    const values = [id];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to retrieve tax brazil');
    }

    if (result.rowCount === 0) return undefined;
    const row = result.rows[0];

    return this.MapToTaxBrazil(row);
  }

  private InsertValues(id: string, tax: TaxBrazil): Array<any> {
    return [id, tax.Value];
  }

  async Insert(id: string, tax: TaxBrazil): Promise<string> {
    const _insert = `INSERT INTO "TAX_BRAZIL"`;
    const _params = `("ID", "VALUE")`;
    const _values = `VALUES ($1, $2)`;

    const query = `${_insert} ${_params} ${_values}`;
    const values = this.InsertValues(id, tax);

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to insert tax brazil');
    }

    return id;
  }

  constructor(@inject(TYPES.IDataContext) private data: IDataContext) {}
}
