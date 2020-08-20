import {UnitCase} from '../../entities/Unit/UnitCase';
import {Currency} from '../../entities/Currency';

export interface IUnitCaseRepository {
  Retrieve(id: string, currency: Currency): Promise<UnitCase | undefined>;
}
