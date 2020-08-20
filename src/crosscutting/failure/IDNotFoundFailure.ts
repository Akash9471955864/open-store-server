import {FailureType} from './FailureType';
import {Failure} from './Failure';

export class IDNotFoundFailure implements Failure {
  message = 'One or more IDs were not found';
  type = FailureType.IDNotFound;

  constructor(public param: Array<string>) {}
}
