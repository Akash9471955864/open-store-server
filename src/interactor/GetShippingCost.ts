import {IGetShippingCostValidator} from '../validation/validators/IGetShippingCostValidator';
import {IUnitRepository} from '../domain/repositories/IUnitRepository/IUnitRepository';
import {IShippingService} from '../domain/services/ShippingService/IShippingService';
import {ICurrencyService} from '../domain/services/CurrencyService/ICurrencyService';
import {InvalidRequestFailure} from '../crosscutting/failure/InvalidRequestFailure';
import {IDNotFoundFailure} from '../crosscutting/failure/IDNotFoundFailure';
import {Currency, toString} from '../domain/entities/Currency';
import {Failure} from '../crosscutting/failure/Failure';
import {fromString} from '../domain/entities/Country';
import {Address} from '../domain/entities/Address';
import {Unit} from '../domain/entities/Unit/Unit';
import {TYPES} from '../crosscutting/di/di_types';
import {injectable, inject} from 'inversify';
import {
  ShippingType,
  fromString as shippingTypeFromString,
} from '../domain/entities/ShippingType';

export class Request {
  shipping_type?: string;
  units?: string[];

  shipping_postal_code?: string;
  shipping_country?: string;
  shipping_street?: string;
  shipping_state?: string;
  shipping_city?: string;
}

export class Response {
  error?: Failure;
  shipping_price?: number;
  shipping_currency?: string;
}

@injectable()
export class Interactor {
  async Handle(request: Request): Promise<Response> {
    // Validate Request
    const validation = this.validator.Validate(request);
    if (!validation.Valid) {
      return {error: new InvalidRequestFailure(validation)};
    }

    // Build components
    const type = this.BuildType(request);
    const address = this.BuildAddress(request);
    const currency = this.BuildCurrency(address);
    const units = await this.BuildUnits(request, currency);

    // Check error retrieving units
    if (this.error !== undefined) {
      return {error: this.error};
    }

    // Retrieve shipping cost
    const price = this.shippingService.CalculateShippingPrice(
      units,
      address,
      type
    );

    // Build response
    return {
      shipping_price: price.Price,
      shipping_currency: toString(price.Currency),
    };
  }

  private BuildType(request: Request): ShippingType {
    return shippingTypeFromString(request.shipping_type!)!;
  }

  private BuildCurrency(address: Address): Currency {
    return this.currencyService.GetCurrencyForCountry(address.Country);
  }

  private BuildAddress(request: Request): Address {
    const country = fromString(request.shipping_country!)!;

    return new Address(
      request.shipping_postal_code!,
      country,
      request.shipping_street!,
      request.shipping_state!,
      request.shipping_city!
    );
  }

  private async BuildUnits(
    request: Request,
    currency: Currency
  ): Promise<Unit[]> {
    const requests = [];

    for (const item of request.units!) {
      const task = this.unitRepository.Retrieve(item, currency);
      requests.push(task);
    }

    const units = await Promise.all(requests);
    if (units.find(x => x === undefined)) {
      this.error = new IDNotFoundFailure(request.units!);
      return [];
    }

    return <Unit[]>units;
  }

  private error?: Failure;

  constructor(
    @inject(TYPES.IShippingService) private shippingService: IShippingService,
    @inject(TYPES.ICurrencyService) private currencyService: ICurrencyService,
    @inject(TYPES.IUnitRepository) private unitRepository: IUnitRepository,
    @inject(TYPES.IGetShippingCostValidator)
    private validator: IGetShippingCostValidator
  ) {}
}
