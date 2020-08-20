import {Request} from '../../interactor/RetrieveUnit';
import {ValidationResult} from '../ValidationResult';

export interface IRetrieveProductValidator {
  Validate(value: Request): ValidationResult;
}
