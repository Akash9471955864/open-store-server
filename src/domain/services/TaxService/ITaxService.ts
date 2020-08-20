import {Address} from '../../entities/Address';
import {Pricing} from '../../entities/Pricing';
import {Tax} from '../../entities/Tax/Tax';

export interface ITaxService {
  CalculateTax(price: Pricing, address: Address): Tax;
}
