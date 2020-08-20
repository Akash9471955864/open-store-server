import {IDataContext} from '../dataContext/IDataContext';
import {injectable, inject} from 'inversify';
import {IUnitOfWork} from './IUnitOfWork';
import {TYPES} from '../di/di_types';

@injectable()
export class UnitOfWork implements IUnitOfWork {
  async revert(): Promise<void> {
    await this.dataContext.query('ROLLBACK');
  }

  async commit(): Promise<void> {
    await this.dataContext.query('COMMIT');
  }

  async begin(): Promise<void> {
    await this.dataContext.query('BEGIN');
  }

  constructor(@inject(TYPES.IDataContext) private dataContext: IDataContext) {}
}
