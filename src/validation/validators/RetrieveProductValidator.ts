import {IRetrieveProductValidator} from './IRetrieveProductValidator';
import {Request} from '../../interactor/RetrieveProduct';
import {ValidCountry} from '../rules/ValidCountry';
import {ValidID} from '../rules/ValidID';
import {Validator} from '../Validator';
import {injectable} from 'inversify';

@injectable()
export class RetrieveProductValidator extends Validator<Request>
  implements IRetrieveProductValidator {
  constructor() {
    super();
    this.AddRule(new ValidID(), r => r.id, 'ID');
    this.AddRule(new ValidCountry(), r => r.country, 'Country');
  }
}
