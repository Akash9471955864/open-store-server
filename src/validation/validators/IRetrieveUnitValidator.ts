import {Request} from '../../interactor/RetrieveUnit';
import {ValidationResult} from '../ValidationResult';

export interface IRetrieveUnitValidator {
  Validate(value: Request): ValidationResult;
}
