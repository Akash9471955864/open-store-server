import {ProductShoe} from '../../entities/Product/ProductShoe';

export interface IProductShoeRepository {
  Retrieve(id: string): Promise<ProductShoe | undefined>;
}
