import {IUnitRepository} from '../../domain/repositories/IUnitRepository/IUnitRepository';
import {IStockRepository} from '../../domain/repositories/IStockRepository';
import {IDataContext} from '../../crosscutting/dataContext/IDataContext';
import {Currency} from '../../domain/entities/Currency';
import {TYPES} from '../../crosscutting/di/di_types';
import {Stock} from '../../domain/entities/Stock';
import {injectable, inject} from 'inversify';
import {QueryResult} from 'pg';

@injectable()
export class StockRepository implements IStockRepository {
  async CheckAvailability(unit: string, quantity: number): Promise<boolean> {
    const _select = `SELECT SUM("QUANTITY") as QUANTITY FROM "STOCK"`;
    const _where = `WHERE "UNIT" = $1`;

    const query = `${_select} ${_where}`;

    let result: QueryResult;

    try {
      result = await this.data.query(query, [unit]);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to check availability for unit');
    }

    if (result.rowCount === 0) {
      throw new Error('Unit does not exist in stock');
    }

    const result_quantity = result.rows[0].QUANTITY;
    return quantity <= result_quantity;
  }

  async Update(stock: Stock): Promise<void> {
    const _update = `UPDATE "STOCK"`;
    const _set = `SET "QUANTITY" = $1`;
    const _where = `WHERE "UNIT" = $2`;

    const query = `${_update} ${_set} ${_where}`;
    const values = [stock.Quantity, stock.Unit.ID];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to update stock');
    }
  }

  async RetrieveByUnit(
    unitId: string,
    currency: Currency
  ): Promise<Stock | undefined> {
    const _select = `SELECT * FROM "STOCK"`;
    const _where = `WHERE "UNIT" = $1`;

    const query = `${_select} ${_where}`;
    const values = [unitId];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to retrieve stock by unit');
    }

    if (result.rowCount === 0) return undefined;
    const row = result.rows[0];

    // Retrieve quantity
    const quantity = row.QUANTITY;

    // Retrieve unit
    const unit = await this.unitRepository.Retrieve(unitId, currency);
    if (unit === undefined) return undefined;

    return new Stock(quantity, unit);
  }

  constructor(
    @inject(TYPES.IUnitRepository) private unitRepository: IUnitRepository,
    @inject(TYPES.IDataContext) private data: IDataContext
  ) {}
}
