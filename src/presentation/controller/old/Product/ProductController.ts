import {RetrieveAllProductsRequestMessage} from '../../../interactor/old/Product/RetrieveAllProducts/RetrieveAllProductsRequestMessage';
import {RetrieveAllProductsInteractor} from '../../../../interactor/old/Product/RetrieveAllProducts/RetrieveAllProductsInteractor';
import {RetrieveProductRequestMessage} from '../../../interactor/old/Product/RetrieveProduct/RetrieveProductRequestMessage';
import {RetrieveAllProductsResponsePresenter} from '../../../presenter/old/Product/RetrieveAllProductsResponsePresenter';
import {RetrieveProductInteractor} from '../../../../interactor/old/Product/RetrieveProduct/RetrieveProductInteractor';
import {RetrieveProductResponsePresenter} from '../../../presenter/old/Product/RetrieveProductResponsePresenter';
import {IProductController} from './IProductController';
import {TYPES} from '../../../../crosscutting/di/di_types';
import {injectable, inject} from 'inversify';
import {Request, Response} from 'express';

@injectable()
export class ProductController implements IProductController {
  async all_available(req: Request, res: Response) {
    const message = new RetrieveAllProductsRequestMessage();
    const result = await this.retrieveAllProductsInteractor.handle(message);
    new RetrieveAllProductsResponsePresenter().handle(res, result);
  }

  async get(req: Request, res: Response) {
    const id = req.params.id;
    const message = new RetrieveProductRequestMessage(id);
    const result = await this.retrieveProductInteractor.handle(message);
    new RetrieveProductResponsePresenter().handle(res, result);
  }

  constructor(
    @inject(TYPES.RetrieveProductInteractor)
    private retrieveProductInteractor: RetrieveProductInteractor,
    @inject(TYPES.RetrieveAllProductsInteractor)
    private retrieveAllProductsInteractor: RetrieveAllProductsInteractor
  ) {}
}
