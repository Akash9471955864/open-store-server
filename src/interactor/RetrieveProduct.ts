import {inject, injectable} from 'inversify';
import {TYPES} from '../crosscutting/di/di_types';
import {IProductRepository} from '../domain/repositories/IProductRepository/IProductRepository';
import {IUnitRepository} from '../domain/repositories/IUnitRepository/IUnitRepository';
import {Failure} from '../crosscutting/failure/Failure';
import {Product} from '../domain/entities/Product/Product';
import {Unit} from '../domain/entities/Unit/Unit';
import {IDNotFoundFailure} from '../crosscutting/failure/IDNotFoundFailure';
import {IRetrieveProductValidator} from '../validation/validators/IRetrieveProductValidator';
import {InvalidRequestFailure} from '../crosscutting/failure/InvalidRequestFailure';
import {fromString} from '../domain/entities/Country';
import {ICurrencyService} from '../domain/services/CurrencyService/ICurrencyService';
import {IStockRepository} from '../domain/repositories/IStockRepository';
import {Stock} from '../domain/entities/Stock';

export class Request {
  country?: string;
  id?: string;
}

export class Response {
  error?: Failure;

  units?: Unit[];
  stock?: Stock[];
  product?: Product;
}

@injectable()
export class Interactor {
  async Handle(request: Request): Promise<Response> {
    // Validate request
    const validation = this.validator.Validate(request);
    if (!validation.Valid) {
      return {error: new InvalidRequestFailure(validation)};
    }

    // Get currency for country
    const country = fromString(request.country!);
    const currency = this.currencyService.GetCurrencyForCountry(country!);

    // Retrieve product
    const product = await this.productRepository.Retrieve(request.id!);
    if (product === undefined) {
      console.error('Failed to retrieve product');
      return {error: new IDNotFoundFailure([request.id!])};
    }

    // Retrieve units
    const units = await this.unitRepository.GetByProduct(
      product.ID!,
      currency!
    );

    // Retrieve stock
    const stocks = new Array<Stock>();

    for (let unit of units) {
      const stock = await this.stockRepository.RetrieveByUnit(
        unit.ID!,
        currency
      );
      if (stock !== undefined) stocks.push(stock);
    }

    // Return response
    return {product, units, stock: stocks};
  }

  constructor(
    @inject(TYPES.IProductRepository)
    private productRepository: IProductRepository,
    @inject(TYPES.IRetrieveProductValidator)
    private validator: IRetrieveProductValidator,
    @inject(TYPES.ICurrencyService)
    private currencyService: ICurrencyService,
    @inject(TYPES.IStockRepository)
    private stockRepository: IStockRepository,
    @inject(TYPES.IUnitRepository)
    private unitRepository: IUnitRepository
  ) {}
}
