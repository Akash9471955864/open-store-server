import {TaxBrazil} from '../../entities/Tax/TaxBrazil';

export interface ITaxBrazilRepository {
  Insert(id: string, tax: TaxBrazil): Promise<string>;
  Retrieve(id: string): Promise<TaxBrazil | undefined>;
}
