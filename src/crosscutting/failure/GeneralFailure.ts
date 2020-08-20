import {FailureType} from './FailureType';
import {Failure} from './Failure';

export class GeneralFailure implements Failure {
  message =
    'General Failure' + this.param?.message ? ': ' + this.param?.message : '';
  type = FailureType.GeneralFailure;

  constructor(public param?: Error) {}
}
