import {IPricingRepository} from '../../domain/repositories/IPricingRepository';
import {IDataContext} from '../../crosscutting/dataContext/IDataContext';
import {toString, fromString} from '../../domain/entities/Currency';
import {Pricing} from '../../domain/entities/Pricing';
import {TYPES} from '../../crosscutting/di/di_types';
import {injectable, inject} from 'inversify';
import {QueryResult} from 'pg';

@injectable()
export class PricingRepository implements IPricingRepository {
  private MapToPricing(pricing: any): Pricing {
    const currency = fromString(pricing.CURRENCY);
    const price = Number.parseInt(pricing.PRICE);
    return new Pricing(currency!, price);
  }

  async Retrieve(id: string): Promise<Pricing | undefined> {
    const select = `SELECT * FROM "PRICING"`;
    const where = `WHERE "ID" = $1`;

    const query = `${select} ${where}`;
    const values = [id];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to retrieve pricing');
    }

    if (result.rowCount === 0) return undefined;
    const row = result.rows[0];

    return this.MapToPricing(row);
  }

  private InsertValues(pricing: Pricing): Array<string | number> {
    const currency = toString(pricing.Currency);
    return [currency, pricing.Price];
  }

  async Insert(pricing: Pricing): Promise<string> {
    const _insert = `INSERT INTO "PRICING"`;
    const _params = `("CURRENCY", "PRICE")`;
    const _values = `VALUES ($1, $2)`;
    const _return = `RETURNING "ID"`;

    const query = `${_insert} ${_params} ${_values} ${_return}`;
    const values = this.InsertValues(pricing);

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to insert pricing');
    }

    return result.rows[0].ID;
  }

  constructor(@inject(TYPES.IDataContext) private data: IDataContext) {}
}
