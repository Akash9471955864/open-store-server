import {FailureType} from './FailureType';
import {Failure} from './Failure';

export class ProductUnavailableFailure implements Failure {
  message = 'One or more products are not available';
  type = FailureType.ProductUnavailable;

  constructor(public param: Array<string>) {}
}
