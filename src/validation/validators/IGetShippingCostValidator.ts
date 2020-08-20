import {Request} from '../../interactor/GetShippingCost';
import {ValidationResult} from '../ValidationResult';

export interface IGetShippingCostValidator {
  Validate(value: Request): ValidationResult;
}
