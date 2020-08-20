import {ValidationResult} from '../ValidationResult';
import {Request} from '../../interactor/GetCatalog';

export interface IGetCatalogValidator {
  Validate(value: Request): ValidationResult;
}
