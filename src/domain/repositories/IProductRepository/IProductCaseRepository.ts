import {ProductCase} from '../../entities/Product/ProductCase';

export interface IProductCaseRepository {
  Retrieve(id: string): Promise<ProductCase | undefined>;
}
