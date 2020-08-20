import {IGetCatalogValidator} from './IGetCatalogValidator';
import {Request} from '../../interactor/GetCatalog';
import {ValidCountry} from '../rules/ValidCountry';
import {Validator} from '../Validator';
import {injectable} from 'inversify';

@injectable()
export class GetCatalogValidator extends Validator<Request>
  implements IGetCatalogValidator {
  constructor() {
    super();
    this.AddRule(new ValidCountry(false), x => x.country, 'Country');
  }
}
