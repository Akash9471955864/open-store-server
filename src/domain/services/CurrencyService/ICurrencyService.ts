import {Country} from '../../entities/Country';
import {Currency} from '../../entities/Currency';

export interface ICurrencyService {
  GetCurrencyForCountry(country: Country): Currency;
}
