import {FailureType} from './FailureType';

export interface Failure {
  type: FailureType;
  message: string;
  param?: any;
}
