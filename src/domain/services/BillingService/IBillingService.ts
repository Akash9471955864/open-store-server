import {Shipping} from '../../entities/Shipping';
import {Address} from '../../entities/Address';
import {Billing} from '../../entities/Billing';
import {Item} from '../../entities/Item';

export interface IBillingService {
  Create(address: Address, shipping: Shipping, items: Item[]): Promise<Billing>;
}
