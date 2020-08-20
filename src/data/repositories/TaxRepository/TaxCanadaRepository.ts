import {ITaxCanadaRepository} from '../../../domain/repositories/ITaxRepository/ITaxCanadaRepository';
import {IDataContext} from '../../../crosscutting/dataContext/IDataContext';
import {TaxCanada} from '../../../domain/entities/Tax/TaxCanada';
import {TYPES} from '../../../crosscutting/di/di_types';
import {injectable, inject} from 'inversify';
import {QueryResult} from 'pg';

@injectable()
export class TaxCanadaRepository implements ITaxCanadaRepository {
  private MapToTaxCanada(tax: any): TaxCanada {
    const isHarmonized = tax.IS_HARMONIZED;
    const harmonizedTax = Number.parseInt(tax.HARMONIZED_TAX);
    const provincialTax = Number.parseInt(tax.PROVINCIAL_TAX);
    const federalTax = Number.parseInt(tax.FEDERAL_TAX);

    return new TaxCanada(
      isHarmonized,
      harmonizedTax,
      provincialTax,
      federalTax
    );
  }

  async Retrieve(id: string): Promise<TaxCanada | undefined> {
    const select = `SELECT * FROM "TAX_CANADA"`;
    const where = `WHERE "ID" = $1`;

    const query = `${select} ${where}`;
    const values = [id];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to retrieve tax canada');
    }

    if (result.rowCount === 0) return undefined;
    const row = result.rows[0];

    return this.MapToTaxCanada(row);
  }

  private InsertValues(id: string, tax: TaxCanada): Array<any> {
    return [
      id,
      tax.IsHarmonized,
      tax.HarmonizedTax,
      tax.FederalTax,
      tax.ProvincialTax,
    ];
  }

  async Insert(id: string, tax: TaxCanada): Promise<string> {
    const _insert = `INSERT INTO "TAX_CANADA"`;
    const _params = `("ID", "IS_HARMONIZED", "HARMONIZED_TAX", "FEDERAL_TAX", "PROVINCIAL_TAX")`;
    const _values = `VALUES ($1, $2, $3, $4, $5)`;

    const query = `${_insert} ${_params} ${_values}`;
    const values = this.InsertValues(id, tax);

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to insert tax canada');
    }

    return id;
  }

  constructor(@inject(TYPES.IDataContext) private data: IDataContext) {}
}
