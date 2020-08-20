import {IRetrieveUnitPresenter} from '../../presenter/IRetrieveUnitPresenter';
import {TYPES} from '../../../crosscutting/di/di_types';
import {IUnitController} from './IUnitController';
import {injectable, inject} from 'inversify';
import {Request, Response} from 'express';

import {
  Request as RetrieveRequest,
  Interactor as RetrieveInteractor,
} from '../../../interactor/RetrieveUnit';

@injectable()
export class UnitController implements IUnitController {
  async Retrieve(req: Request, res: Response<any>): Promise<void> {
    const request = new RetrieveRequest();

    request.country = req.query.country || 'ANY';
    request.id = req.params.id;

    const response = await this.retrieveUnit.Handle(request);
    this.retrievePresenter.Handle(response, res);
  }

  constructor(
    @inject(TYPES.RetrieveUnitInteractor)
    private retrieveUnit: RetrieveInteractor,
    @inject(TYPES.IRetrieveUnitPresenter)
    private retrievePresenter: IRetrieveUnitPresenter
  ) {}
}
