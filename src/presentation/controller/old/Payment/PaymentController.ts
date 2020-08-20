import {CalculateTaxResponsePresenter} from '../../../presenter/old/Payment/CalculateTax/CalculateTaxResponsePresenter';
import {CalculateTaxRequestMessage} from '../../../interactor/old/Payment/CalculateTax/CalculateTaxRequestMessage';
import {CalculateTaxInteractor} from '../../../interactor/old/Payment/CalculateTax/CalculateTaxInteractor';
import {IPaymentController} from './IPaymentController';
import {TYPES} from '../../../../crosscutting/di/di_types';
import {injectable, inject} from 'inversify';
import {Request, Response} from 'express';

@injectable()
export class PaymentController implements IPaymentController {
  async calculateTax(req: Request, res: Response<any>): Promise<void> {
    const province = req.body.province;
    const price = req.body.price;

    const requestMessage = new CalculateTaxRequestMessage(province, price);
    const result = await this.interactor.handle(requestMessage);
    new CalculateTaxResponsePresenter().handle(res, result);
  }

  constructor(
    @inject(TYPES.CalculateTaxInteractor)
    private interactor: CalculateTaxInteractor
  ) {}
}
