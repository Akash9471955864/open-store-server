import {ICatalogRepository} from '../../domain/repositories/ICatalogRepository';
import {Currency, toString, fromString} from '../../domain/entities/Currency';
import {IDataContext} from '../../crosscutting/dataContext/IDataContext';
import {CatalogEntry} from '../../domain/entities/CatalogEntry';
import {Product} from '../../domain/entities/Product/Product';
import {Catalog} from '../../domain/entities/Catalog';
import {Country} from '../../domain/entities/Country';
import {Pricing} from '../../domain/entities/Pricing';
import {TYPES} from '../../crosscutting/di/di_types';
import {inject, injectable} from 'inversify';
import {QueryResult} from 'pg';
import {IProductRepository} from '../../domain/repositories/IProductRepository/IProductRepository';

@injectable()
export class CatalogRepository implements ICatalogRepository {
  private async ToCatalogEntry(entry: any): Promise<CatalogEntry> {
    const currency = fromString(entry.CURRENCY);
    const price = Number.parseInt(entry.PRICE);
    const pricing = new Pricing(currency!, price);

    const quantity = Number.parseInt(entry.QUANTITY);

    const product = await this.productRepository.Retrieve(entry.ID);
    if (product === undefined) {
      throw new Error('Failed to retrieve product for catalog');
    }

    return new CatalogEntry(product, quantity, pricing);
  }

  async GetInternationalCatalog(currency: Currency): Promise<Catalog> {
    const select =
      `SELECT p."ID", ` +
      `MIN(price."PRICE") as "PRICE", price."CURRENCY", ` +
      `SUM(s."QUANTITY") as "QUANTITY" FROM "UNIT" u`;
    const join =
      `JOIN "UNIT_PRICE" up ON up."UNIT" = u."ID" ` +
      `JOIN "PRICING" price ON price."ID" = up."PRICE" ` +
      `JOIN "STOCK" s ON s."UNIT" = u."ID" ` +
      `JOIN "PRODUCT" p ON p."ID" = u."PRODUCT"`;
    const where = `WHERE price."CURRENCY" = $1 AND s."QUANTITY" > 0`;
    const groupBy = `GROUP BY p."ID", price."CURRENCY"`;

    const query = `${select} ${join} ${where} ${groupBy}`;
    const values = [toString(currency)];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to get international catalog');
    }

    const entries = [];
    for (const row of result.rows) {
      const entry = await this.ToCatalogEntry(row);
      entries.push(entry);
    }

    const from = new Date(2020, 1, 1);
    const to = new Date(2100, 1, 1);
    const country = Country.ANY;

    return new Catalog(entries, country, from, to, 'International Catalog');
  }

  constructor(
    @inject(TYPES.IDataContext) private data: IDataContext,
    @inject(TYPES.IProductRepository)
    private productRepository: IProductRepository
  ) {}
}
