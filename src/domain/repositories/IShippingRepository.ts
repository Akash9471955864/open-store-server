import {Shipping} from '../entities/Shipping';

export interface IShippingRepository {
  Retrieve(id: string): Promise<Shipping | undefined>;
  Insert(shipping: Shipping): Promise<string>;
}
