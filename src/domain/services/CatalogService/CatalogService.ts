import {ICatalogRepository} from '../../repositories/ICatalogRepository';
import {ICurrencyService} from '../CurrencyService/ICurrencyService';
import {TYPES} from '../../../crosscutting/di/di_types';
import {ICatalogService} from './ICatalogService';
import {Country} from '../../entities/Country';
import {Catalog} from '../../entities/Catalog';
import {inject, injectable} from 'inversify';

@injectable()
export class CatalogService implements ICatalogService {
  async GetCatalog(country: Country, _: Date): Promise<Catalog> {
    const currency = this.currencyService.GetCurrencyForCountry(country);
    return this.repository.GetInternationalCatalog(currency);
  }

  constructor(
    @inject(TYPES.ICatalogRepository)
    private repository: ICatalogRepository,
    @inject(TYPES.ICurrencyService)
    private currencyService: ICurrencyService
  ) {}
}
