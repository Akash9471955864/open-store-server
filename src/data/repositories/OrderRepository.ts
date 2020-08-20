import {ICustomerRepository} from '../../domain/repositories/ICustomerRepository';
import {IShippingRepository} from '../../domain/repositories/IShippingRepository';
import {IBillingRepository} from '../../domain/repositories/IBillingRepository';
import {IOrderRepository} from '../../domain/repositories/IOrderRepository';
import {IItemRepository} from '../../domain/repositories/IItemRepository';
import {IDataContext} from '../../crosscutting/dataContext/IDataContext';
import {Shipping} from '../../domain/entities/Shipping';
import {Customer} from '../../domain/entities/Customer';
import {Billing} from '../../domain/entities/Billing';
import {TYPES} from '../../crosscutting/di/di_types';
import {Order} from '../../domain/entities/Order';
import {Item} from '../../domain/entities/Item';
import {injectable, inject} from 'inversify';
import {QueryResult} from 'pg';
import {
  toString,
  fromString as OrderStatusFromString,
} from '../../domain/entities/OrderStatus';

@injectable()
export class OrderRepository implements IOrderRepository {
  private MapToOrder(
    order: any,
    customer: Customer,
    shipping: Shipping,
    billing: Billing,
    items: Item[]
  ): Order {
    const status = OrderStatusFromString(order.STATUS);
    const date = new Date(order.DATE);
    const id = order.ID;

    return new Order(status!, customer, shipping, billing, items, date, id);
  }

  async Retrieve(id: string): Promise<Order | undefined> {
    const _select = `SELECT * FROM "ORDER"`;
    const _where = `WHERE "ID" = $1`;

    const query = `${_select} ${_where}`;
    const values = [id];

    // Run query
    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to retrieve order');
    }

    // Check result
    if (result.rowCount === 0) return undefined;
    const row = result.rows[0];

    // Retrieve customer
    const customer = await this.customerRepository.Retrieve(row.CUSTOMER);
    if (customer === undefined) return undefined;

    // Retrieve shipping
    const shipping = await this.shippingRepository.Retrieve(row.SHIPPING);
    if (shipping === undefined) return undefined;

    // Retrieve billing
    const billing = await this.billingRepository.Retrieve(row.BILLING);
    if (billing === undefined) return undefined;

    // Retrieve items
    const items = await this.itemRepository.RetrieveByOrder(row.ID);

    // Map to order
    return this.MapToOrder(row, customer, shipping, billing, items);
  }

  async Insert(order: Order): Promise<string> {
    const shipping_id = await this.shippingRepository.Insert(order.Shipping);
    const customer_id = await this.customerRepository.Insert(order.Customer);
    const billing_id = await this.billingRepository.Insert(order.Billing);
    const status = toString(order.Status);
    const date = order.Date;

    const _insert = `INSERT INTO "ORDER"`;
    const _params = `("SHIPPING", "CUSTOMER", "BILLING", "STATUS", "DATE")`;
    const _values = `VALUES ($1, $2, $3, $4, $5)`;
    const _return = `RETURNING "ID"`;

    const query = `${_insert} ${_params} ${_values} ${_return}`;
    const values = [shipping_id, customer_id, billing_id, status, date];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to insert order');
    }

    const order_id = result.rows[0].ID;

    for (const item of order.Items) {
      await this.itemRepository.Insert(item, order_id);
    }

    return order_id;
  }

  async Update(order: Order): Promise<void> {
    const _update = `UPDATE "ORDER"`;
    const _values = `SET "STATUS" = $1`;
    const _where = `WHERE "ID" = $2`;

    const status = toString(order.Status);
    const id = order.ID;

    const query = `${_update} ${_values} ${_where}`;
    const values = [status, id];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to update order');
    }
  }

  constructor(
    @inject(TYPES.IShippingRepository)
    private shippingRepository: IShippingRepository,
    @inject(TYPES.ICustomerRepository)
    private customerRepository: ICustomerRepository,
    @inject(TYPES.IBillingRepository)
    private billingRepository: IBillingRepository,
    @inject(TYPES.IItemRepository)
    private itemRepository: IItemRepository,
    @inject(TYPES.IDataContext) private data: IDataContext
  ) {}
}
