import {Response as InteractorReponse} from '../../interactor/InsertOrder';
import {Response} from 'express';

export interface IInsertOrderPresenter {
  Handle(response: InteractorReponse, res: Response): void;
}
