import {Unit} from '../../entities/Unit/Unit';
import {Item} from '../../entities/Item';

export interface IStockService {
  CheckAvailability(unit: Unit, quantity: number): Promise<boolean>;
  Reserve(items: Item[]): Promise<void>;
  Release(items: Item[]): Promise<void>;
}
