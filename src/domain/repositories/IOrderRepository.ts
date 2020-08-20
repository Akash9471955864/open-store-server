import {Order} from '../entities/Order';

export interface IOrderRepository {
  Retrieve(id: string): Promise<Order | undefined>;
  Insert(order: Order): Promise<string>;
  Update(order: Order): Promise<void>;
}
