import {Currency} from '../../entities/Currency';
import {Unit} from '../../entities/Unit/Unit';

export interface IUnitRepository {
  Retrieve(id: string, currency: Currency): Promise<Unit | undefined>;
  GetByProduct(product: string, currency: Currency): Promise<Unit[]>;
}
