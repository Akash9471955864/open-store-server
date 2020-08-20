import {Currency} from '../entities/Currency';
import {Catalog} from '../entities/Catalog';

export interface ICatalogRepository {
  GetInternationalCatalog(currency: Currency): Promise<Catalog>;
}
