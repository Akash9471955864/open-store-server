import {ValidationResult} from '../ValidationResult';
import {Request} from '../../interactor/InsertOrder';

export interface IInsertOrderValidator {
  Validate(value: Request): ValidationResult;
}
