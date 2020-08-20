import {ShippingType} from '../../entities/ShippingType';
import {IShippingService} from './IShippingService';
import {Currency} from '../../entities/Currency';
import {Address} from '../../entities/Address';
import {Pricing} from '../../entities/Pricing';
import {Country} from '../../entities/Country';
import {Unit} from '../../entities/Unit/Unit';
import {injectable} from 'inversify';

@injectable()
export class ShippingService implements IShippingService {
  ShippingPriceCanada(
    units: Unit[],
    address: Address,
    shippingType: ShippingType
  ): Pricing {
    if (units.length >= 2) {
      return new Pricing(Currency.CAD, 0);
    }

    switch (shippingType) {
      case ShippingType.REGULAR:
        return new Pricing(Currency.CAD, 2000);
      case ShippingType.EXPRESS:
        return new Pricing(Currency.CAD, 2700);
    }

    throw new Error('Unexpected shipping configuration');
  }

  ShippingPriceBrazil(
    units: Unit[],
    address: Address,
    shippingType: ShippingType
  ): Pricing {
    return new Pricing(Currency.BRL, 1500);
  }

  CalculateShippingPrice(
    units: Unit[],
    address: Address,
    shippingType: ShippingType
  ): Pricing {
    switch (address.Country) {
      case Country.CANADA:
        return this.ShippingPriceCanada(units, address, shippingType);
      case Country.BRAZIL:
        return this.ShippingPriceBrazil(units, address, shippingType);
      default:
        throw new Error('Invalid destination country');
    }
  }
}
