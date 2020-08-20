import {IProductShoeRepository} from '../../../domain/repositories/IProductRepository/IProductShoeRepository';
import {IUnitShoeRepository} from '../../../domain/repositories/IUnitRepository/IUnitShoeRepository';
import {IDataContext} from '../../../crosscutting/dataContext/IDataContext';
import {ProductShoe} from '../../../domain/entities/Product/ProductShoe';
import {UnitShoe} from '../../../domain/entities/Unit/UnitShoe';
import {Pricing} from '../../../domain/entities/Pricing';
import {TYPES} from '../../../crosscutting/di/di_types';
import {injectable, inject} from 'inversify';
import {QueryResult} from 'pg';
import {
  fromString,
  Currency,
  toString,
} from '../../../domain/entities/Currency';

@injectable()
export class UnitShoeRepository implements IUnitShoeRepository {
  private Map(entity: any, product: ProductShoe): UnitShoe {
    const price_num = Number.parseInt(entity.PRICE);
    const currency = fromString(entity.CURRENCY)!;
    const price = new Pricing(currency, price_num);

    const size = Number.parseFloat(entity.SIZE);
    return new UnitShoe(product, size, price, entity.ID);
  }

  async Retrieve(
    id: string,
    currency: Currency
  ): Promise<UnitShoe | undefined> {
    const _get = `SELECT u."PRODUCT", unit.*, price."PRICE", price."CURRENCY" FROM "UNIT_SHOE" unit`;
    const _join1 = `JOIN "UNIT" u ON u."ID" = unit."ID"`;
    const _join2 = `JOIN "UNIT_PRICE" rel ON unit."ID" = rel."UNIT"`;
    const _join3 = `JOIN "PRICING" price ON rel."PRICE" = price."ID"`;
    const _where = `WHERE unit."ID" = $1 AND price."CURRENCY" = $2`;

    const query = `${_get} ${_join1} ${_join2} ${_join3} ${_where}`;
    const values = [id, toString(currency)];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to get unit shoe');
    }

    if (result.rowCount === 0) return undefined;

    const product_id = result.rows[0].PRODUCT;
    const product = await this.productShoeRepository.Retrieve(product_id);

    if (product === undefined) return undefined;

    return this.Map(result.rows[0], product);
  }

  constructor(
    @inject(TYPES.IProductShoeRepository)
    private productShoeRepository: IProductShoeRepository,
    @inject(TYPES.IDataContext) private data: IDataContext
  ) {}
}
