import {Response as InteractorReponse} from '../../interactor/GetShippingCost';
import {Response} from 'express';

export interface IGetShippingCostPresenter {
  Handle(response: InteractorReponse, res: Response): void;
}
