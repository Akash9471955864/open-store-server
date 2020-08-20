import {IGetCatalogPresenter} from '../../presenter/IGetCatalogPresenter';
import {ICatalogController} from './ICatalogController';
import {TYPES} from '../../../crosscutting/di/di_types';
import {inject, injectable} from 'inversify';
import {Request, Response} from 'express';
import {
  Request as GetCatalogRequest,
  Interactor as GetCatalogInteractor,
} from '../../../interactor/GetCatalog';

@injectable()
export class CatalogController implements ICatalogController {
  async Get(req: Request, res: Response): Promise<void> {
    const country = req.query.country;

    const request = new GetCatalogRequest();
    request.country = country;
    request.date = new Date();

    const response = await this.interactor.Handle(request);
    this.presenter.Handle(response, res);
  }

  constructor(
    @inject(TYPES.GetCatalogInteractor)
    private interactor: GetCatalogInteractor,
    @inject(TYPES.IGetCatalogPresenter)
    private presenter: IGetCatalogPresenter
  ) {}
}
