import {ICurrencyService} from './ICurrencyService';
import {Currency} from '../../entities/Currency';
import {Country} from '../../entities/Country';
import {injectable} from 'inversify';

@injectable()
export class CurrencyService implements ICurrencyService {
  GetCurrencyForCountry(country: Country): Currency {
    switch (country) {
      case Country.CANADA:
        return Currency.CAD;
      case Country.BRAZIL:
        return Currency.BRL;
      case Country.ANY:
        return Currency.CAD;
    }
  }
}
