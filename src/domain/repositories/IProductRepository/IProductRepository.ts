import {Product} from '../../entities/Product/Product';

export interface IProductRepository {
  Retrieve(id: string): Promise<Product | undefined>;
}
