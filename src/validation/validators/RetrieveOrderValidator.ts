import {IRetrieveOrderValidator} from './IRetrieveOrderValidator';
import {Request} from '../../interactor/RetrieveOrder';
import {ValidID} from '../rules/ValidID';
import {Validator} from '../Validator';
import {injectable} from 'inversify';

@injectable()
export class RetrieveOrderValidator extends Validator<Request>
  implements IRetrieveOrderValidator {
  constructor() {
    super();
    this.AddRule(new ValidID(), x => x.id, 'ID');
  }
}
