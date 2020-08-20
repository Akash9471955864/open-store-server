import {BillingStatus} from '../../entities/BillingStatus';
import {TYPES} from '../../../crosscutting/di/di_types';
import {ITaxService} from '../TaxService/ITaxService';
import {IPaymentService} from '../IPaymentService';
import {IBillingService} from './IBillingService';
import {Shipping} from '../../entities/Shipping';
import {Address} from '../../entities/Address';
import {Billing} from '../../entities/Billing';
import {Pricing} from '../../entities/Pricing';
import {injectable, inject} from 'inversify';
import {Item} from '../../entities/Item';

@injectable()
export class BillingService implements IBillingService {
  async Create(
    address: Address,
    shipping: Shipping,
    items: Item[]
  ): Promise<Billing> {
    const price = this.calculateTotalPrice(items);
    const price_with_shipping = price.Add(shipping.Price.Price);

    const tax = await this.taxService.CalculateTax(
      price_with_shipping,
      address
    );
    const taxxed_price = price_with_shipping.Add(tax.getTotal());

    const status = BillingStatus.PENDING;
    const payment = await this.paymentService.Create(taxxed_price);

    return new Billing(status, address, payment, tax);
  }

  calculateTotalPrice(items: Item[]): Pricing {
    const total = items.reduce((prev, curr) => prev + curr.TotalPrice.Price, 0);
    const currency = items[0].Price.Currency;
    return new Pricing(currency, total);
  }

  constructor(
    @inject(TYPES.ITaxService)
    private taxService: ITaxService,
    @inject(TYPES.IPaymentService)
    private paymentService: IPaymentService
  ) {}
}
