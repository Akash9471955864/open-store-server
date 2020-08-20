import {IProductCaseRepository} from '../../../domain/repositories/IProductRepository/IProductCaseRepository';
import {IUnitCaseRepository} from '../../../domain/repositories/IUnitRepository/IUnitCaseRepository';
import {IDataContext} from '../../../crosscutting/dataContext/IDataContext';
import {ProductCase} from '../../../domain/entities/Product/ProductCase';
import {UnitCase} from '../../../domain/entities/Unit/UnitCase';
import {
  fromString,
  toString,
  Currency,
} from '../../../domain/entities/Currency';
import {Pricing} from '../../../domain/entities/Pricing';
import {TYPES} from '../../../crosscutting/di/di_types';
import {injectable, inject} from 'inversify';
import {QueryResult} from 'pg';

@injectable()
export class UnitCaseRepository implements IUnitCaseRepository {
  private Map(entity: any, product: ProductCase): UnitCase {
    const price_num = Number.parseInt(entity.PRICE);
    const currency = fromString(entity.CURRENCY)!;
    const price = new Pricing(currency, price_num);

    return new UnitCase(product, entity.DEVICE, price, entity.ID);
  }

  async Retrieve(
    id: string,
    currency: Currency
  ): Promise<UnitCase | undefined> {
    const _get = `SELECT u."PRODUCT", unit.*, price."PRICE", price."CURRENCY" FROM "UNIT_CASE" unit`;
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
    const product = await this.productCaseRepository.Retrieve(product_id);

    if (product === undefined) return undefined;

    return this.Map(result.rows[0], product);
  }

  constructor(
    @inject(TYPES.IProductCaseRepository)
    private productCaseRepository: IProductCaseRepository,
    @inject(TYPES.IDataContext) private data: IDataContext
  ) {}
}
