import {IPaymentStripeRepository} from '../../../domain/repositories/IPaymentRepository/IPaymentStripeRepository';
import {PaymentStripe} from '../../../domain/entities/Payment/Stripe/PaymentStripe';
import {IDataContext} from '../../../crosscutting/dataContext/IDataContext';
import {TYPES} from '../../../crosscutting/di/di_types';
import {injectable, inject} from 'inversify';
import {QueryResult} from 'pg';
import {
  toString,
  fromString,
} from '../../../domain/entities/Payment/PaymentStatus';

@injectable()
export class PaymentStripeRepository implements IPaymentStripeRepository {
  async GetOrderIdByIntent(intent: string): Promise<string | undefined> {
    const _select = `SELECT o."ID" FROM "ORDER" o`;
    const _join1 = `JOIN "BILLING" b ON b."ID" = o."BILLING"`;
    const _join2 = `JOIN "PAYMENT_STRIPE" p ON p."ID" = b."PAYMENT"`;
    const _where = `WHERE p."INTENT" = $1`;

    const query = `${_select} ${_join1} ${_join2} ${_where}`;
    const values = [intent];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to get order by intent');
    }

    if (result.rowCount === 0) return undefined;
    return result.rows[0].ID;
  }

  private InsertValues(id: string, payment: PaymentStripe): Array<string> {
    const status = toString(payment.Status);
    return [id, payment.ClientSecret, payment.Intent, status];
  }

  private MapToPaymentStripe(payment_stripe: any): PaymentStripe {
    const clientSecret = payment_stripe.CLIENT_SECRET;
    const status = fromString(payment_stripe.STATUS);
    const intent = payment_stripe.INTENT;

    return new PaymentStripe(clientSecret, intent, status!);
  }

  async Insert(id: string, payment: PaymentStripe): Promise<string> {
    const _insert = `INSERT INTO "PAYMENT_STRIPE"`;
    const _params = `("ID", "CLIENT_SECRET", "INTENT", "STATUS")`;
    const _values = `VALUES ($1, $2, $3, $4)`;

    const query = `${_insert} ${_params} ${_values}`;
    const values = this.InsertValues(id, payment);

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to insert payment stripe');
    }

    return id;
  }

  async RetrieveByIntent(intent: string): Promise<PaymentStripe | undefined> {
    const select = `SELECT * FROM "PAYMENT_STRIPE"`;
    const where = `WHERE "INTENT" = $1`;

    const query = `${select} ${where}`;
    const values = [intent];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to retrieve payment stripe');
    }

    if (result.rowCount === 0) return undefined;
    const row = result.rows[0];

    return this.MapToPaymentStripe(row);
  }

  async Retrieve(id: string): Promise<PaymentStripe | undefined> {
    const select = `SELECT * FROM "PAYMENT_STRIPE"`;
    const where = `WHERE "ID" = $1`;

    const query = `${select} ${where}`;
    const values = [id];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to retrieve payment stripe');
    }

    if (result.rowCount === 0) return undefined;
    const row = result.rows[0];

    return this.MapToPaymentStripe(row);
  }

  async Update(payment: PaymentStripe): Promise<void> {
    const _update = `UPDATE "PAYMENT_STRIPE"`;
    const _params = `SET "STATUS" = $1`;
    const _where = `WHERE "INTENT" = $2`;

    const status = toString(payment.Status);
    const intent = payment.Intent;

    const query = `${_update} ${_params} ${_where}`;
    const values = [status, intent];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to update payment stripe');
    }
  }

  constructor(@inject(TYPES.IDataContext) private data: IDataContext) {}
}
