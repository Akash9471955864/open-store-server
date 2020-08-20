import {Billing} from '../entities/Billing';

export interface IBillingRepository {
  Insert(billing: Billing): Promise<string>;
  Retrieve(id: string): Promise<Billing | undefined>;
}
