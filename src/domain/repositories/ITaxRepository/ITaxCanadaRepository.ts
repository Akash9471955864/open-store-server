import {TaxCanada} from '../../entities/Tax/TaxCanada';

export interface ITaxCanadaRepository {
  Insert(id: string, tax: TaxCanada): Promise<string>;
  Retrieve(id: string): Promise<TaxCanada | undefined>;
}
