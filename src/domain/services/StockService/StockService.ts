import {IStockRepository} from '../../repositories/IStockRepository';
import {TYPES} from '../../../crosscutting/di/di_types';
import {IStockService} from './IStockService';
import {Unit} from '../../entities/Unit/Unit';
import {injectable, inject} from 'inversify';
import {Item} from '../../entities/Item';

@injectable()
export class StockService implements IStockService {
  async CheckAvailability(unit: Unit, quantity: number): Promise<boolean> {
    const id = unit.ID;

    if (id === undefined) {
      throw new Error('Attempting to check availability of undefined unit');
    }

    return await this.stockRepository.CheckAvailability(id, quantity);
  }

  async Reserve(items: Item[]): Promise<void> {
    for (let item of items) {
      const stock = await this.stockRepository.RetrieveByUnit(
        item.Unit.ID!,
        item.Price.Currency
      );
      if (stock === undefined) {
        throw new Error(
          'Failed to reserve order. Stock for unit does not exist.'
        );
      }
      stock.Reserve(item.Quantity);
      await this.stockRepository.Update(stock);
    }
  }

  async Release(items: Item[]): Promise<void> {
    for (let item of items) {
      const stock = await this.stockRepository.RetrieveByUnit(
        item.Unit.ID!,
        item.Price.Currency
      );
      if (stock === undefined) {
        throw new Error(
          'Failed to release order. Stock for unit does not exist.'
        );
      }
      stock.Release(item.Quantity);
      await this.stockRepository.Update(stock);
    }
  }

  constructor(
    @inject(TYPES.IStockRepository) private stockRepository: IStockRepository
  ) {}
}
