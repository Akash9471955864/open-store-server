import {IRetrieveUnitValidator} from './IRetrieveUnitValidator';
import {Request} from '../../interactor/RetrieveUnit';
import {ValidCountry} from '../rules/ValidCountry';
import {ValidID} from '../rules/ValidID';
import {Validator} from '../Validator';
import {injectable} from 'inversify';

@injectable()
export class RetrieveUnitValidator extends Validator<Request>
  implements IRetrieveUnitValidator {
  constructor() {
    super();
    this.AddRule(new ValidID(), x => x.id, 'ID');
    this.AddRule(new ValidCountry(true), x => x.country, 'Country');
  }
}
