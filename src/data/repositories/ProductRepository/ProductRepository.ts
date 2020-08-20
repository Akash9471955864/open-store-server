import {IProductShoeRepository} from '../../../domain/repositories/IProductRepository/IProductShoeRepository';
import {IProductCaseRepository} from '../../../domain/repositories/IProductRepository/IProductCaseRepository';
import {IProductRepository} from '../../../domain/repositories/IProductRepository/IProductRepository';
import {IDataContext} from '../../../crosscutting/dataContext/IDataContext';
import {Product} from '../../../domain/entities/Product/Product';
import {TYPES} from '../../../crosscutting/di/di_types';
import {injectable, inject} from 'inversify';
import {QueryResult} from 'pg';

@injectable()
export class ProductRepository implements IProductRepository {
  async Retrieve(id: string): Promise<Product | undefined> {
    const _get = `SELECT * FROM "PRODUCT"`;
    const _where = `WHERE "ID" = $1`;

    const query = `${_get} ${_where}`;
    const values = [id];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to retrieve product');
    }

    if (result.rowCount === 0) return undefined;
    const type = result.rows[0].TYPE;

    if (type === 'SHOE') return this.shoeRepository.Retrieve(id);
    if (type === 'CASE') return this.caseRepository.Retrieve(id);

    throw new Error('Unexpected type when retrieving product');
  }

  constructor(
    @inject(TYPES.IProductShoeRepository)
    private shoeRepository: IProductShoeRepository,
    @inject(TYPES.IProductCaseRepository)
    private caseRepository: IProductCaseRepository,
    @inject(TYPES.IDataContext)
    private data: IDataContext
  ) {}
}
