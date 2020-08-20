import {Response as InteractorReponse} from '../../interactor/RetrieveProduct';
import {Response} from 'express';

export interface IRetrieveProductPresenter {
  Handle(response: InteractorReponse, res: Response): void;
}
