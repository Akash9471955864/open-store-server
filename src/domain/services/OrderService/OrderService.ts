import {OrderStatus} from '../../entities/OrderStatus';
import {IOrderService} from './IOrderService';
import {Customer} from '../../entities/Customer';
import {Shipping} from '../../entities/Shipping';
import {Billing} from '../../entities/Billing';
import {Order} from '../../entities/Order';
import {Item} from '../../entities/Item';
import {injectable} from 'inversify';

@injectable()
export class OrderService implements IOrderService {
  Create(
    customer: Customer,
    shipping: Shipping,
    billing: Billing,
    items: Item[]
  ): Order {
    const status = OrderStatus.CREATED;
    const date = new Date();

    return new Order(status, customer, shipping, billing, items, date);
  }
}
