import {IShippingRepository} from '../../domain/repositories/IShippingRepository';
import {IPricingRepository} from '../../domain/repositories/IPricingRepository';
import {IAddressRepository} from '../../domain/repositories/IAddressRepository';
import {IDataContext} from '../../crosscutting/dataContext/IDataContext';
import {toString, fromString} from '../../domain/entities/ShippingType';
import {Shipping} from '../../domain/entities/Shipping';
import {Address} from '../../domain/entities/Address';
import {Pricing} from '../../domain/entities/Pricing';
import {TYPES} from '../../crosscutting/di/di_types';
import {injectable, inject} from 'inversify';
import {QueryResult} from 'pg';

@injectable()
export class ShippingRepository implements IShippingRepository {
  private MapToShipping(
    shipping: any,
    address: Address,
    price: Pricing
  ): Shipping {
    const tracking = shipping.TRACKING;
    const type = fromString(shipping.TYPE);
    return new Shipping(tracking, type!, address, price);
  }

  async Retrieve(id: string): Promise<Shipping | undefined> {
    const select = `SELECT * FROM "SHIPPING"`;
    const where = `WHERE "ID" = $1`;

    const query = `${select} ${where}`;
    const values = [id];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to retrieve shipping');
    }

    if (result.rowCount === 0) return undefined;
    const row = result.rows[0];

    // Retrieve address
    const address = await this.addressRepository.Retrieve(row.ADDRESS);
    if (address === undefined) return undefined;

    // Retrieve price
    const price = await this.pricingRepository.Retrieve(row.PRICE);
    if (price === undefined) return undefined;

    // Map to shipping
    return this.MapToShipping(row, address, price);
  }

  async Insert(shipping: Shipping): Promise<string> {
    const address_id = await this.addressRepository.Insert(shipping.Address);
    const pricing_id = await this.pricingRepository.Insert(shipping.Price);
    const type = toString(shipping.Type);
    const tracking = shipping.Tracking;

    const _insert = `INSERT INTO "SHIPPING"`;
    const _params = `("ADDRESS", "PRICE", "TYPE", "TRACKING")`;
    const _values = `VALUES ($1, $2, $3, $4)`;
    const _return = `RETURNING "ID"`;

    const query = `${_insert} ${_params} ${_values} ${_return}`;
    const values = [address_id, pricing_id, type, tracking];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to insert shipping');
    }

    return result.rows[0].ID;
  }

  constructor(
    @inject(TYPES.IAddressRepository)
    private addressRepository: IAddressRepository,
    @inject(TYPES.IPricingRepository)
    private pricingRepository: IPricingRepository,
    @inject(TYPES.IDataContext) private data: IDataContext
  ) {}
}
