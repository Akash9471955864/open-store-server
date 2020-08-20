import {UnitShoe} from '../../entities/Unit/UnitShoe';
import {Currency} from '../../entities/Currency';

export interface IUnitShoeRepository {
  Retrieve(id: string, currency: Currency): Promise<UnitShoe | undefined>;
}
