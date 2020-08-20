import {IPaymentStripeRepository} from '../../../domain/repositories/IPaymentRepository/IPaymentStripeRepository';
import {IPaymentRepository} from '../../../domain/repositories/IPaymentRepository/IPaymentRepository';
import {PaymentStripe} from '../../../domain/entities/Payment/Stripe/PaymentStripe';
import {IDataContext} from '../../../crosscutting/dataContext/IDataContext';
import {Payment} from '../../../domain/entities/Payment/Payment';
import {TYPES} from '../../../crosscutting/di/di_types';
import {injectable, inject} from 'inversify';
import {QueryResult} from 'pg';

@injectable()
export class PaymentRepository implements IPaymentRepository {
  async Retrieve(id: string): Promise<Payment | undefined> {
    const select = `SELECT * FROM "PAYMENT"`;
    const where = `WHERE "ID" = $1`;

    const query = `${select} ${where}`;
    const values = [id];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to retrieve payment');
    }

    if (result.rowCount === 0) return undefined;
    const row = result.rows[0];

    if (row.HANDLER === 'STRIPE')
      return this.paymentStripeRepository.Retrieve(id);

    return undefined;
  }

  async Insert(payment: Payment): Promise<string> {
    const handler = payment.getPaymentHandler();
    let id: string;

    const _insert = `INSERT INTO "PAYMENT"`;
    const _params = `("HANDLER")`;
    const _values = `VALUES ($1)`;
    const _return = `RETURNING "ID"`;

    const query = `${_insert} ${_params} ${_values} ${_return}`;

    const values = [handler];
    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to insert payment');
    }

    id = result.rows[0].ID;

    if (payment instanceof PaymentStripe) {
      await this.paymentStripeRepository.Insert(id, payment);
    } else {
      throw new Error('Unexpected payment type being inserted');
    }

    return id;
  }

  async Update(payment: Payment): Promise<void> {
    if (payment instanceof PaymentStripe) {
      await this.paymentStripeRepository.Update(payment);
    } else {
      throw new Error('Failed to update payment. Unexpected type.');
    }
  }

  constructor(
    @inject(TYPES.IPaymentStripeRepository)
    private paymentStripeRepository: IPaymentStripeRepository,
    @inject(TYPES.IDataContext)
    private data: IDataContext
  ) {}
}
