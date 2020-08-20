import {Response as InteractorReponse} from '../../interactor/RetrieveUnit';
import {Response} from 'express';

export interface IRetrieveUnitPresenter {
  Handle(response: InteractorReponse, res: Response): void;
}
