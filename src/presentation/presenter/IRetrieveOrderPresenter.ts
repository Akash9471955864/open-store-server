import {Response as InteractorReponse} from '../../interactor/RetrieveOrder';
import {Response} from 'express';

export interface IRetrieveOrderPresenter {
  Handle(response: InteractorReponse, res: Response): void;
}
