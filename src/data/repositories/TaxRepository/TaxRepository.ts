import {ITaxBrazilRepository} from '../../../domain/repositories/ITaxRepository/ITaxBrazilRepository';
import {ITaxCanadaRepository} from '../../../domain/repositories/ITaxRepository/ITaxCanadaRepository';
import {ITaxRepository} from '../../../domain/repositories/ITaxRepository/ITaxRepository';
import {IDataContext} from '../../../crosscutting/dataContext/IDataContext';
import {TaxCanada} from '../../../domain/entities/Tax/TaxCanada';
import {TaxBrazil} from '../../../domain/entities/Tax/TaxBrazil';
import {TYPES} from '../../../crosscutting/di/di_types';
import {Tax} from '../../../domain/entities/Tax/Tax';
import {injectable, inject} from 'inversify';
import {QueryResult} from 'pg';

@injectable()
export class TaxRepository implements ITaxRepository {
  async Retrieve(id: string): Promise<Tax | undefined> {
    const select = `SELECT * FROM "TAX"`;
    const where = `WHERE "ID" = $1`;

    const query = `${select} ${where}`;
    const values = [id];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to retrieve tax');
    }

    if (result.rowCount === 0) return undefined;
    const row = result.rows[0];

    if (row.TYPE === 'CANADA') return this.taxCanadaRepository.Retrieve(row.ID);
    if (row.TYPE === 'BRAZIL') return this.taxBrazilRepository.Retrieve(row.ID);

    return undefined;
  }

  async Insert(tax: Tax): Promise<string> {
    let type: string;
    let id: string;

    const _insert = `INSERT INTO "TAX"`;
    const _params = `("TYPE")`;
    const _values = `VALUES ($1)`;
    const _return = `RETURNING "ID"`;

    if (tax instanceof TaxCanada) type = 'CANADA';
    else if (tax instanceof TaxBrazil) type = 'BRAZIL';
    else throw new Error('Attempted to insert unexpected tax type');

    const query = `${_insert} ${_params} ${_values} ${_return}`;
    const values = [type];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to insert tax');
    }

    id = result.rows[0].ID;

    if (tax instanceof TaxCanada) {
      await this.taxCanadaRepository.Insert(id, tax);
    } else if (tax instanceof TaxBrazil) {
      await this.taxBrazilRepository.Insert(id, tax);
    } else {
      throw new Error('Attempted to insert unexpected tax type');
    }

    return id;
  }

  constructor(
    @inject(TYPES.ITaxCanadaRepository)
    private taxCanadaRepository: ITaxCanadaRepository,
    @inject(TYPES.ITaxBrazilRepository)
    private taxBrazilRepository: ITaxBrazilRepository,
    @inject(TYPES.IDataContext)
    private data: IDataContext
  ) {}
}
