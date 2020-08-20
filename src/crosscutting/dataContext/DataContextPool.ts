import {IDataContext} from './IDataContext';
import {DataContext} from './DataContext';
import {injectable} from 'inversify';
import {Pool, PoolClient} from 'pg';

@injectable()
export class DataContextPool {
  private pool: Pool;

  async getContext(): Promise<IDataContext> {
    const poolClient = await this.pool.connect();
    return new DataContext(poolClient);
  }

  async getClient(): Promise<PoolClient> {
    const poolClient = await this.pool.connect();
    return poolClient;
  }

  constructor() {
    this.pool = new Pool();
  }
}
