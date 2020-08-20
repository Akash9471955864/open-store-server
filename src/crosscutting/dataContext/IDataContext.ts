import {QueryResult} from 'pg';

export interface IDataContext {
  query(query: string, values?: Array<any>): Promise<QueryResult<any>>;
  release(): void;
}
