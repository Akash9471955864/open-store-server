import {ProductUnavailableFailure} from '../../crosscutting/failure/ProductUnavailableFailure';
import {InvalidRequestFailure} from '../../crosscutting/failure/InvalidRequestFailure';
import {IDNotFoundFailure} from '../../crosscutting/failure/IDNotFoundFailure';
import {Response as InteractorReponse} from '../../interactor/GetShippingCost';
import {IGetShippingCostPresenter} from './IGetShippingCostPresenter';
import {injectable} from 'inversify';
import {Response} from 'express';

@injectable()
export class GetShippingCostPresenter implements IGetShippingCostPresenter {
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

    res.send({
      currency: response.shipping_currency!,
      price: response.shipping_price!,
    });
  }
}
