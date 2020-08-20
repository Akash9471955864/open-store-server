import {RetrieveUnitRequestMessage} from '../../../interactor/old/Unit/RetrieveUnit/RetrieveUnitRequestMessage';
import {RetrieveUnitInteractor} from '../../../../interactor/old/Unit/RetrieveUnit/RetrieveUnitInteractor';
import {RetrieveUnitResponsePresenter} from '../../../presenter/old/Unit/RetrieveUnitResponsePresenter';
import {TYPES} from '../../../../crosscutting/di/di_types';
import {IUnitController} from './IUnitController';
import {injectable, inject} from 'inversify';
import {Request, Response} from 'express';

@injectable()
export class UnitController implements IUnitController {
  async get(req: Request, res: Response) {
    const id = req.params.id;
    const message = new RetrieveUnitRequestMessage(id);
    const result = await this.retrieveUnitInteractor.handle(message);
    new RetrieveUnitResponsePresenter().handle(res, result);
  }

  constructor(
    @inject(TYPES.RetrieveUnitInteractor)
    private retrieveUnitInteractor: RetrieveUnitInteractor
  ) {}
}
