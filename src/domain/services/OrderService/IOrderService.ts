import {Shipping} from '../../entities/Shipping';
import {Customer} from '../../entities/Customer';
import {Billing} from '../../entities/Billing';
import {Order} from '../../entities/Order';
import {Item} from '../../entities/Item';

export interface IOrderService {
  Create(
    customer: Customer,
    shipping: Shipping,
    billing: Billing,
    items: Item[]
  ): Order;
}
