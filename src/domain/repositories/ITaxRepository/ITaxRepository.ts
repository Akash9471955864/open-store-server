import {Tax} from '../../entities/Tax/Tax';

export interface ITaxRepository {
  Insert(tax: Tax): Promise<string>;
  Retrieve(id: string): Promise<Tax | undefined>;
}
