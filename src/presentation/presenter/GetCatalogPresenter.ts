import {ProductUnavailableFailure} from '../../crosscutting/failure/ProductUnavailableFailure';
import {InvalidRequestFailure} from '../../crosscutting/failure/InvalidRequestFailure';
import {IDNotFoundFailure} from '../../crosscutting/failure/IDNotFoundFailure';
import {toString as CurrencyToString} from '../../domain/entities/Currency';
import {Response as InteractorReponse} from '../../interactor/GetCatalog';
import {ProductShoe} from '../../domain/entities/Product/ProductShoe';
import {ProductCase} from '../../domain/entities/Product/ProductCase';
import {CatalogEntry} from '../../domain/entities/CatalogEntry';
import {IGetCatalogPresenter} from './IGetCatalogPresenter';
import {Pricing} from '../../domain/entities/Pricing';
import {injectable} from 'inversify';
import {Response} from 'express';

@injectable()
export class GetCatalogPresenter implements IGetCatalogPresenter {
  MapPrice(price: Pricing): any {
    return {
      currency: CurrencyToString(price.Currency),
      price: price.Price,
    };
  }

  private MapEntry(entry: CatalogEntry): any {
    let type: string | undefined = undefined;
    if (entry.Product instanceof ProductShoe) type = 'SHOE';
    if (entry.Product instanceof ProductCase) type = 'CASE';

    return {
      description: entry.Product.Description,
      name: entry.Product.Name,
      id: entry.Product.ID,

      price: this.MapPrice(entry.Price),
      quantity: entry.Quantity,
      type: type,
    };
  }

  Handle(response: InteractorReponse, res: Response): void {
    if (response.error !== undefined) {
      if (response.error instanceof InvalidRequestFailure) {
        res.status(400).send(response.error);
      } else if (response.error instanceof ProductUnavailableFailure) {
        res.status(403).send(response.error);
      } else if (response.error instanceof IDNotFoundFailure) {
        res.status(404).send(response.error);
      } else {
        res.status(500);
      }

      return;
    }

    res.send(response.catalog?.Entries.map(this.MapEntry, this));
  }
}
