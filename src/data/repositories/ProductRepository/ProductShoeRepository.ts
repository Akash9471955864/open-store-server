import {IProductShoeRepository} from '../../../domain/repositories/IProductRepository/IProductShoeRepository';
import {IDataContext} from '../../../crosscutting/dataContext/IDataContext';
import {ProductShoe} from '../../../domain/entities/Product/ProductShoe';
import {TYPES} from '../../../crosscutting/di/di_types';
import {injectable, inject} from 'inversify';
import {QueryResult} from 'pg';

@injectable()
export class ProductShoeRepository implements IProductShoeRepository {
  private Map(entity: any): ProductShoe {
    return new ProductShoe(
      entity.ARTIST,
      entity.DESCRIPTION,
      entity.NAME,
      entity.ID
    );
  }

  async Retrieve(id: string): Promise<ProductShoe | undefined> {
    const _get = `SELECT * FROM "PRODUCT_SHOE" ps`;
    const _join = `JOIN "PRODUCT" p ON p."ID" = ps."ID"`;
    const _where = `WHERE ps."ID" = $1`;

    const query = `${_get} ${_join} ${_where}`;
    const values = [id];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to retrieve product shoe');
    }

    if (result.rowCount === 0) return undefined;
    return this.Map(result.rows[0]);
  }

  constructor(@inject(TYPES.IDataContext) private data: IDataContext) {}
}
