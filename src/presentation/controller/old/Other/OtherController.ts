import {SendContactMessageRequestMessage} from '../../../../interactor/old/Other/SendContactMessage/SendContactMessageRequestMessage';
import {SendContactMessageInteractor} from '../../../../interactor/old/Other/SendContactMessage/SendContactMessageInteractor';
import {SendContactMessageResponsePresenter} from '../../../presenter/old/Other/SendContactMessageResponsePresenter';
import {TYPES} from '../../../../crosscutting/di/di_types';
import {IOtherController} from './IOtherController';
import {injectable, inject} from 'inversify';
import {Request, Response} from 'express';

@injectable()
export class OtherController implements IOtherController {
  async sendContactMessage(req: Request, res: Response<any>): Promise<void> {
    const name = req.body.name;
    const email = req.body.email;
    const order = req.body.order;
    const message = req.body.message;

    const request = new SendContactMessageRequestMessage(
      name,
      email,
      order,
      message
    );

    const result = await this.sendContactMessageInteractor.handle(request);
    new SendContactMessageResponsePresenter().handle(res, result);
  }

  constructor(
    @inject(TYPES.SendContactMessageInteractor)
    private sendContactMessageInteractor: SendContactMessageInteractor
  ) {}
}
