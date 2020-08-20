import {Stock} from '../entities/Stock';
import {Currency} from '../entities/Currency';

export interface IStockRepository {
  RetrieveByUnit(unit: string, currency: Currency): Promise<Stock | undefined>;
  CheckAvailability(unit: string, quantity: number): Promise<boolean>;
  Update(stock: Stock): Promise<void>;
}
