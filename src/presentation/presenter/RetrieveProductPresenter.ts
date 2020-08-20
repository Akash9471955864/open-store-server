import {ProductUnavailableFailure} from '../../crosscutting/failure/ProductUnavailableFailure';
import {InvalidRequestFailure} from '../../crosscutting/failure/InvalidRequestFailure';
import {IDNotFoundFailure} from '../../crosscutting/failure/IDNotFoundFailure';
import {Response as InteractorReponse} from '../../interactor/RetrieveProduct';
import {toString as CurrencyToString} from '../../domain/entities/Currency';
import {IRetrieveProductPresenter} from './IRetrieveProductPresenter';
import {ProductCase} from '../../domain/entities/Product/ProductCase';
import {ProductShoe} from '../../domain/entities/Product/ProductShoe';
import {Product} from '../../domain/entities/Product/Product';
import {UnitCase} from '../../domain/entities/Unit/UnitCase';
import {UnitShoe} from '../../domain/entities/Unit/UnitShoe';
import {Pricing} from '../../domain/entities/Pricing';
import {Unit} from '../../domain/entities/Unit/Unit';
import {Stock} from '../../domain/entities/Stock';
import {injectable} from 'inversify';
import {Response} from 'express';

@injectable()
export class RetrieveProductPresenter implements IRetrieveProductPresenter {
  MapPrice(price: Pricing): any {
    return {
      currency: CurrencyToString(price.Currency),
      price: price.Price,
    };
  }

  MapUnit(unit: Unit, stock: Stock): any {
    const result: any = {};

    result.price = this.MapPrice(unit.Price);
    result.available = stock.Quantity > 0;
    result.id = unit.ID;

    //if (stock.Quantity > 0 && stock.Quantity <= 5) {
    result.quantity = stock.Quantity;
    // }

    if (unit instanceof UnitCase) {
      result.device = unit.Device;
      result.type = 'CASE';
    }

    if (unit instanceof UnitShoe) {
      result.size = unit.Size;
      result.type = 'SHOE';
    }

    return result;
  }

  MapProduct(product: Product): any {
    let result: any = {
      id: product.ID,
      name: product.Name,
      description: product.Description,
    };

    let type: string | undefined;
    if (product instanceof ProductShoe) {
      result.artist = product.Artist;
      result.type = 'SHOE';
    }
    if (product instanceof ProductCase) {
      result.artist = product.Artist;
      result.type = 'CASE';
    }

    return result;
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

    const units = new Array<any>();
    for (let unit of response.units!) {
      for (let stock of response.stock!) {
        if (unit.ID === stock.Unit.ID) {
          units.push(this.MapUnit(unit, stock));
          break;
        }
      }
    }

    res.send({
      product: this.MapProduct(response.product!),
      units,
    });
  }
}
