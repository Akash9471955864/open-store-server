import {CalculateShippingCostRequestMessage} from '../../../../interactor/old/Shipping/CalculateShippingCost/CalculateShippingCostRequestMessage';
import {CalculateShippingCostInteractor} from '../../../../interactor/old/Shipping/CalculateShippingCost/CalculateShippingCostInteractor';
import {CalculateShippingCostResponsePresenter} from '../../../presenter/old/Shipping/CalculateShippingCostResponsePresenter';
import {IShippingController} from './IShippingController';
import {TYPES} from '../../../../crosscutting/di/di_types';
import {injectable, inject} from 'inversify';
import {Request, Response} from 'express';

@injectable()
export class ShippingController implements IShippingController {
  async cost(req: Request, res: Response) {
    const type = req.body.type;
    const count = req.body.count;

    const message = new CalculateShippingCostRequestMessage(type, count);
    const result = this.interactor.handle(message);
    new CalculateShippingCostResponsePresenter().handle(res, result);
  }

  constructor(
    @inject(TYPES.CalculateShippingCostInteractor)
    private interactor: CalculateShippingCostInteractor
  ) {}
}
