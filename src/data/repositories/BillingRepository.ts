import {IPaymentRepository} from '../../domain/repositories/IPaymentRepository/IPaymentRepository';
import {ITaxRepository} from '../../domain/repositories/ITaxRepository/ITaxRepository';
import {IBillingRepository} from '../../domain/repositories/IBillingRepository';
import {IAddressRepository} from '../../domain/repositories/IAddressRepository';
import {IDataContext} from '../../crosscutting/dataContext/IDataContext';
import {Payment} from '../../domain/entities/Payment/Payment';
import {Billing} from '../../domain/entities/Billing';
import {Address} from '../../domain/entities/Address';
import {TYPES} from '../../crosscutting/di/di_types';
import {Tax} from '../../domain/entities/Tax/Tax';
import {injectable, inject} from 'inversify';
import {QueryResult} from 'pg';
import {
  toString,
  fromString as BillingStatusFromString,
} from '../../domain/entities/BillingStatus';

@injectable()
export class BillingRepository implements IBillingRepository {
  private MapToBilling(
    billing: any,
    address: Address,
    payment: Payment,
    tax: Tax
  ): Billing {
    const status = BillingStatusFromString(billing.STATUS);
    return new Billing(status!, address, payment, tax);
  }

  async Retrieve(id: string): Promise<Billing | undefined> {
    const select = `SELECT * FROM "BILLING"`;
    const where = `WHERE "ID" = $1`;

    const query = `${select} ${where}`;
    const values = [id];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to retrieve billing');
    }

    if (result.rowCount === 0) return undefined;
    const row = result.rows[0];

    // Retrieve address
    const address = await this.addressRepository.Retrieve(row.ADDRESS);
    if (address === undefined) return undefined;

    // Retrieve payment
    const payment = await this.paymentRepository.Retrieve(row.PAYMENT);
    if (payment === undefined) return undefined;

    // Retrieve tax
    const tax = await this.taxRepository.Retrieve(row.TAX);
    if (tax === undefined) return undefined;

    // Map to Billing
    return this.MapToBilling(row, address, payment, tax);
  }

  async Insert(billing: Billing): Promise<string> {
    const address_id = await this.addressRepository.Insert(billing.Address);
    const payment_id = await this.paymentRepository.Insert(billing.Payment);
    const tax_id = await this.taxRepository.Insert(billing.Tax);
    const status = toString(billing.Status);

    const _insert = `INSERT INTO "BILLING"`;
    const _params = `("ADDRESS", "PAYMENT", "TAX", "STATUS")`;
    const _values = `VALUES ($1, $2, $3, $4)`;
    const _return = `RETURNING "ID"`;

    const query = `${_insert} ${_params} ${_values} ${_return}`;
    const values = [address_id, payment_id, tax_id, status];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to insert billing');
    }

    return result.rows[0].ID;
  }

  constructor(
    @inject(TYPES.IAddressRepository)
    private addressRepository: IAddressRepository,
    @inject(TYPES.IPaymentRepository)
    private paymentRepository: IPaymentRepository,
    @inject(TYPES.ITaxRepository)
    private taxRepository: ITaxRepository,
    @inject(TYPES.IDataContext) private data: IDataContext
  ) {}
}
