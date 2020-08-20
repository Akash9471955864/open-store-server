import {ProductUnavailableFailure} from '../../crosscutting/failure/ProductUnavailableFailure';
import {InvalidRequestFailure} from '../../crosscutting/failure/InvalidRequestFailure';
import {IDNotFoundFailure} from '../../crosscutting/failure/IDNotFoundFailure';
import {Response as InteractorReponse} from '../../interactor/RetrieveUnit';
import {toString as CurrencyToString} from '../../domain/entities/Currency';
import {IRetrieveUnitPresenter} from './IRetrieveUnitPresenter';
import {UnitCase} from '../../domain/entities/Unit/UnitCase';
import {UnitShoe} from '../../domain/entities/Unit/UnitShoe';
import {Pricing} from '../../domain/entities/Pricing';
import {Unit} from '../../domain/entities/Unit/Unit';
import {injectable} from 'inversify';
import {Response} from 'express';
import {Stock} from '../../domain/entities/Stock';

@injectable()
export class RetrieveUnitPresenter implements IRetrieveUnitPresenter {
  MapPrice(price: Pricing): any {
    return {
      currency: CurrencyToString(price.Currency),
      price: price.Price,
    };
  }

  MapUnit(unit: Unit, stock: Stock): any {
    let result: any = {};

    result.price = this.MapPrice(unit.Price);
    result.quantity = stock.Quantity;
    result.product = unit.Product;
    result.id = unit.ID!;

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

    res.send(this.MapUnit(response.unit!, response.stock!));
  }
}
