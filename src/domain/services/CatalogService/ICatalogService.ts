import {Country} from '../../entities/Country';
import {Catalog} from '../../entities/Catalog';

export interface ICatalogService {
  GetCatalog(country: Country, date: Date): Promise<Catalog>;
}
