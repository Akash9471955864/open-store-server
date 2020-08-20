import {IProductCaseRepository} from '../../../domain/repositories/IProductRepository/IProductCaseRepository';
import {IDataContext} from '../../../crosscutting/dataContext/IDataContext';
import {ProductCase} from '../../../domain/entities/Product/ProductCase';
import {TYPES} from '../../../crosscutting/di/di_types';
import {injectable, inject} from 'inversify';
import {QueryResult} from 'pg';

@injectable()
export class ProductCaseRepository implements IProductCaseRepository {
  private Map(entity: any): ProductCase {
    return new ProductCase(
      entity.ARTIST,
      entity.DESCRIPTION,
      entity.NAME,
      entity.ID
    );
  }

  async Retrieve(id: string): Promise<ProductCase | undefined> {
    const _get = `SELECT * FROM "PRODUCT_CASE" pc`;
    const _join = `JOIN "PRODUCT" p ON p."ID" = pc."ID"`;
    const _where = `WHERE pc."ID" = $1`;

    const query = `${_get} ${_join} ${_where}`;
    const values = [id];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to retrieve product case');
    }

    if (result.rowCount === 0) return undefined;
    return this.Map(result.rows[0]);
  }

  constructor(@inject(TYPES.IDataContext) private data: IDataContext) {}
}
