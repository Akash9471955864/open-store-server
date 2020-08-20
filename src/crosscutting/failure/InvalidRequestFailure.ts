import {ValidationResult} from '../../validation/ValidationResult';
import {FailureType} from './FailureType';
import {Failure} from './Failure';

export class InvalidRequestFailure implements Failure {
  message = 'Request contains invalid parameters';
  type = FailureType.InvalidRequest;

  constructor(public param: ValidationResult) {}
}
