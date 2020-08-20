import {IDataContext} from './IDataContext';
import {injectable} from 'inversify';
import {PoolClient} from 'pg';

@injectable()
export class DataContext implements IDataContext {
  // Query
  async query(query: string, values: Array<any> = []) {
    return this.client.query(query, values);
  }

  // Control
  release() {
    this.client.release();
  }

  // Constructor
  constructor(private client: PoolClient) {}
}
