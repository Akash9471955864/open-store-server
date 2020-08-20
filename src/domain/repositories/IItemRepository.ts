import {Item} from '../entities/Item';

export interface IItemRepository {
  RetrieveByOrder(id: string): Promise<Array<Item>>;
  Insert(item: Item, order: string): Promise<void>;
}
