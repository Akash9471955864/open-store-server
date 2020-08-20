import {IUnitCaseRepository} from '../../../domain/repositories/IUnitRepository/IUnitCaseRepository';
import {IUnitShoeRepository} from '../../../domain/repositories/IUnitRepository/IUnitShoeRepository';
import {IUnitRepository} from '../../../domain/repositories/IUnitRepository/IUnitRepository';
import {IDataContext} from '../../../crosscutting/dataContext/IDataContext';
import {Currency} from '../../../domain/entities/Currency';
import {Unit} from '../../../domain/entities/Unit/Unit';
import {TYPES} from '../../../crosscutting/di/di_types';
import {injectable, inject} from 'inversify';
import {QueryResult} from 'pg';

@injectable()
export class UnitRepository implements IUnitRepository {
  async Retrieve(id: string, currency: Currency): Promise<Unit | undefined> {
    const _get = `SELECT * FROM "UNIT"`;
    const _where = `WHERE "ID" = $1`;

    const query = `${_get} ${_where}`;
    const values = [id];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to retrieve unit');
    }

    if (result.rowCount === 0) return undefined;

    if (result.rows[0].TYPE === 'SHOE')
      return this.shoeRepository.Retrieve(id, currency);
    if (result.rows[0].TYPE === 'CASE')
      return this.caseRepository.Retrieve(id, currency);

    return undefined;
  }

  async GetByProduct(product: string, currency: Currency): Promise<Unit[]> {
    const _get = `SELECT * FROM "UNIT"`;
    const _where = `WHERE "PRODUCT" = $1`;

    const query = `${_get} ${_where}`;
    const values = [product];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to retrieve units by product');
    }

    const units = new Array<Unit>();
    for (const row of result.rows) {
      let unit: Unit | undefined;

      if (row.TYPE === 'SHOE') {
        unit = await this.shoeRepository.Retrieve(row.ID, currency);
      }

      if (row.TYPE === 'CASE') {
        unit = await this.caseRepository.Retrieve(row.ID, currency);
      }

      if (unit !== undefined) {
        units.push(unit);
      }
    }

    return units;
  }

  constructor(
    @inject(TYPES.IUnitCaseRepository)
    private caseRepository: IUnitCaseRepository,
    @inject(TYPES.IUnitShoeRepository)
    private shoeRepository: IUnitShoeRepository,
    @inject(TYPES.IDataContext) private data: IDataContext
  ) {}
}
