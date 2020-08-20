import {Request} from '../../interactor/RetrieveOrder';
import {ValidationResult} from '../ValidationResult';

export interface IRetrieveOrderValidator {
  Validate(value: Request): ValidationResult;
}
