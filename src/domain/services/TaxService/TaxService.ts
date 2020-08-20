import {TaxCanada} from '../../entities/Tax/TaxCanada';
import {TaxBrazil} from '../../entities/Tax/TaxBrazil';
import {Address} from '../../entities/Address';
import {Country} from '../../entities/Country';
import {Pricing} from '../../entities/Pricing';
import {Tax} from '../../entities/Tax/Tax';
import {ITaxService} from './ITaxService';
import {injectable} from 'inversify';

@injectable()
export class TaxService implements ITaxService {
  private CalculateTaxCanada(price: Pricing, address: Address): TaxCanada {
    const province = address.State;

    const dict = new Map<String, Array<any>>();
    dict.set('AB', [5, 0, false]);
    dict.set('BC', [5, 7, false]);
    dict.set('MB', [5, 7, false]);
    dict.set('NB', [5, 10, true]);
    dict.set('NL', [5, 10, true]);
    dict.set('NS', [5, 10, true]);
    dict.set('NT', [5, 0, false]);
    dict.set('NU', [5, 0, false]);
    dict.set('ON', [5, 8, true]);
    dict.set('PE', [5, 10, true]);
    dict.set('QC', [5, 9.975, false]);
    dict.set('SK', [5, 6, false]);
    dict.set('YT', [5, 0, false]);

    let provincialRate = <number>dict.get(province)![1];
    let isHarmonized = <boolean>dict.get(province)![2];
    let federalRate = <number>dict.get(province)![0];

    const provincialTax = Math.round(price.Price * (provincialRate / 100));
    const federalTax = Math.round(price.Price * (federalRate / 100));

    return new TaxCanada(
      isHarmonized,
      isHarmonized ? federalTax : 0,
      provincialTax,
      isHarmonized ? 0 : federalTax
    );
  }

  private CalculateTaxBrazil(price: Pricing, _: Address): Tax {
    return new TaxBrazil(Math.round(price.Price * 0.1));
  }

  CalculateTax(price: Pricing, address: Address): Tax {
    if (address.Country == Country.CANADA) {
      return this.CalculateTaxCanada(price, address);
    }

    if (address.Country == Country.BRAZIL) {
      return this.CalculateTaxBrazil(price, address);
    }

    throw new Error('Invalid country for calculating tax');
  }
}
