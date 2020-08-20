import {ShippingType} from '../../entities/ShippingType';
import {Address} from '../../entities/Address';
import {Pricing} from '../../entities/Pricing';
import {Unit} from '../../entities/Unit/Unit';

export interface IShippingService {
  CalculateShippingPrice(
    units: Unit[],
    address: Address,
    shippingType: ShippingType
  ): Pricing;
}
