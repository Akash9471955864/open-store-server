import {ProductUnavailableFailure} from '../crosscutting/failure/ProductUnavailableFailure';
import {IUnitRepository} from '../domain/repositories/IUnitRepository/IUnitRepository';
import {fromString as shippingTypeFromString} from '../domain/entities/ShippingType';
import {IShippingService} from '../domain/services/ShippingService/IShippingService';
import {ICurrencyService} from '../domain/services/CurrencyService/ICurrencyService';
import {InvalidRequestFailure} from '../crosscutting/failure/InvalidRequestFailure';
import {InsertOrderValidator} from '../validation/validators/InsertOrderValidator';
import {IBillingService} from '../domain/services/BillingService/IBillingService';
import {IOrderService} from '../domain/services/OrderService/IOrderService';
import {IStockService} from '../domain/services/StockService/IStockService';
import {IDNotFoundFailure} from '../crosscutting/failure/IDNotFoundFailure';
import {IOrderRepository} from '../domain/repositories/IOrderRepository';
import {IUnitOfWork} from '../crosscutting/unitOfWork/IUnitOfWork';
import {ValidationResult} from '../validation/ValidationResult';
import {Failure} from '../crosscutting/failure/Failure';
import {Customer} from '../domain/entities/Customer';
import {Shipping} from '../domain/entities/Shipping';
import {Currency} from '../domain/entities/Currency';
import {Address} from '../domain/entities/Address';
import {Billing} from '../domain/entities/Billing';
import {Unit} from '../domain/entities/Unit/Unit';
import {TYPES} from '../crosscutting/di/di_types';
import {Order} from '../domain/entities/Order';
import {Item} from '../domain/entities/Item';
import {injectable, inject} from 'inversify';
import {
  toString as countryToString,
  fromString as countryFromString,
} from '../domain/entities/Country';

export class Request {
  // Customer
  public name?: string;
  public email?: string;

  // Items
  public items: [string, number][];

  // Billing Address
  public billing_postal_code?: string;
  public billing_country?: string;
  public billing_street?: string;
  public billing_state?: string;
  public billing_city?: string;

  // Shipping Address
  public shipping_postal_code?: string;
  public shipping_country?: string;
  public shipping_street?: string;
  public shipping_state?: string;
  public shipping_city?: string;

  // Shipping type
  public shipping_type?: string;

  public AddItem(id: string, quantity: number): void {
    this.items.push([id, quantity]);
  }

  constructor() {
    this.items = new Array<[string, number]>();
  }
}

export class Response {
  public error?: Failure;
  public order?: Order;
  public id?: string;
}

@injectable()
export class Interactor {
  // Object building
  private async CreateOrder(request: Request): Promise<Order | undefined> {
    const customer = new Customer(request.email!, request.name!);
    const currency = this.GetCurrency(request);

    const items = await this.CreateItems(request, currency);
    if (this.error) return undefined;

    const shipping = this.CreateShipping(request, items);
    const billing = await this.CreateBilling(request, items, shipping);

    return this.orderService.Create(customer, shipping, billing, items);
  }

  private GetCurrency(request: Request): Currency {
    const country = countryFromString(request.shipping_country!)!;
    return this.currencyService.GetCurrencyForCountry(country);
  }

  private async CreateBilling(
    request: Request,
    items: Item[],
    shipping: Shipping
  ): Promise<Billing> {
    const billing_country = countryFromString(request.billing_country!)!;

    const billing_address = new Address(
      request.billing_postal_code!,
      billing_country,
      request.billing_street!,
      request.billing_state!,
      request.billing_city!
    );

    return await this.billingService.Create(billing_address, shipping, items);
  }

  private async CreateItems(
    request: Request,
    currency: Currency
  ): Promise<Item[]> {
    // Check item existence
    const units = new Array<[Unit, number]>();
    for (const [id, quant] of request.items) {
      const unit = await this.unitRepository.Retrieve(id, currency);
      if (unit === undefined) {
        this.error = new IDNotFoundFailure([id]);
        return [];
      }
      units.push([unit, quant]);
    }

    // Check item availability
    for (const [unit, quant] of units) {
      const available = this.stockService.CheckAvailability(unit, quant);
      if (!available) {
        this.error = new ProductUnavailableFailure([unit.ID!]);
        return [];
      }
    }

    // Create items
    const items = new Array<Item>();
    for (const [unit, quant] of units) {
      const item = new Item(quant, unit.Price, unit);
      items.push(item);
    }

    return items;
  }

  private CreateShipping(request: Request, items: Item[]): Shipping {
    const shipping_country = countryFromString(request.shipping_country!)!;
    const shipping_type = shippingTypeFromString(request.shipping_type!)!;

    const shipping_address = new Address(
      request.shipping_postal_code!,
      shipping_country,
      request.shipping_street!,
      request.shipping_state!,
      request.shipping_city!
    );

    const units = items.map(x => x.Unit);
    const shipping_price = this.shippingService.CalculateShippingPrice(
      units,
      shipping_address,
      shipping_type
    );

    return new Shipping(
      undefined,
      shipping_type,
      shipping_address,
      shipping_price
    );
  }

  // Request / Response
  private ValidateRequest(request: Request): ValidationResult {
    const validator = new InsertOrderValidator();
    const result = validator.Validate(request);

    if (!result.Valid) {
      this.error = new InvalidRequestFailure(result);
    }
    return result;
  }

  private BuildReponse(order: Order, id: string): Response {
    const response = new Response();
    response.order = order;
    response.id = id;
    return response;
  }

  // Handling
  private error?: Failure;

  async Handle(request: Request): Promise<Response> {
    this.ValidateRequest(request);
    if (this.error) return {error: this.error};

    await this.unitOfWork.begin();

    var order = await this.CreateOrder(request);
    if (order === undefined) {
      await this.unitOfWork.revert();
      return {error: this.error};
    }

    const id = await this.orderRepository.Insert(order);
    await this.unitOfWork.commit();

    return this.BuildReponse(order, id);
  }

  constructor(
    @inject(TYPES.IShippingService) private shippingService: IShippingService,
    @inject(TYPES.ICurrencyService) private currencyService: ICurrencyService,
    @inject(TYPES.IOrderRepository) private orderRepository: IOrderRepository,
    @inject(TYPES.IBillingService) private billingService: IBillingService,
    @inject(TYPES.IUnitRepository) private unitRepository: IUnitRepository,
    @inject(TYPES.IOrderService) private orderService: IOrderService,
    @inject(TYPES.IStockService) private stockService: IStockService,
    @inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork
  ) {}
}
