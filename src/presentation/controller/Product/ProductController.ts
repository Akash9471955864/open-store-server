import {TYPES} from '../../../crosscutting/di/di_types';
import {IProductController} from './IProductController';
import {injectable, inject} from 'inversify';
import {Request, Response} from 'express';

import {
  Request as RetrieveRequest,
  Interactor as RetrieveInteractor,
} from '../../../interactor/RetrieveProduct';
import {IRetrieveProductPresenter} from '../../presenter/IRetrieveProductPresenter';

@injectable()
export class ProductController implements IProductController {
  async Retrieve(req: Request, res: Response<any>): Promise<void> {
    const request = new RetrieveRequest();

    request.country = req.query.country;
    request.id = req.params.id;

    const response = await this.retrieveProduct.Handle(request);
    this.presenter.Handle(response, res);
  }

  constructor(
    @inject(TYPES.RetrieveProductInteractor)
    private retrieveProduct: RetrieveInteractor,
    @inject(TYPES.IRetrieveProductPresenter)
    private presenter: IRetrieveProductPresenter
  ) {}
}
