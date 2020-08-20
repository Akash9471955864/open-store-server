import {Response as InteractorReponse} from '../../interactor/GetCatalog';
import {Response} from 'express';

export interface IGetCatalogPresenter {
  Handle(response: InteractorReponse, res: Response): void;
}
