import {IRetrieveUnitValidator} from '../validation/validators/IRetrieveUnitValidator';
import {IUnitRepository} from '../domain/repositories/IUnitRepository/IUnitRepository';
import {ICurrencyService} from '../domain/services/CurrencyService/ICurrencyService';
import {InvalidRequestFailure} from '../crosscutting/failure/InvalidRequestFailure';
import {IDNotFoundFailure} from '../crosscutting/failure/IDNotFoundFailure';
import {Failure} from '../crosscutting/failure/Failure';
import {fromString} from '../domain/entities/Country';
import {TYPES} from '../crosscutting/di/di_types';
import {Unit} from '../domain/entities/Unit/Unit';
import {inject, injectable} from 'inversify';
import {Stock} from '../domain/entities/Stock';
import {IStockRepository} from '../domain/repositories/IStockRepository';

export class Request {
  id?: string;
  country?: string;
}

export class Response {
  error?: Failure;
  stock?: Stock;
  unit?: Unit;
}

@injectable()
export class Interactor {
  async Handle(request: Request): Promise<Response> {
    const validation = this.validator.Validate(request);
    if (!validation.Valid) {
      return {error: new InvalidRequestFailure(validation)};
    }

    const currency = this.currencyService.GetCurrencyForCountry(
      fromString(request.country!)!
    );

    /*
    const unit = await this.repository.Retrieve(request.id!, currency);
    if (unit === undefined) {
      return {error: new IDNotFoundFailure([request.id!])};
    }
    */

    const stock = await this.stockRepository.RetrieveByUnit(
      request.id!,
      currency
    );
    if (stock === undefined) {
      return {error: new IDNotFoundFailure([request.id!])};
    }

    return {unit: stock.Unit, stock};
  }

  constructor(
    @inject(TYPES.ICurrencyService) private currencyService: ICurrencyService,
    @inject(TYPES.IStockRepository) private stockRepository: IStockRepository,
    @inject(TYPES.IUnitRepository) private repository: IUnitRepository,
    @inject(TYPES.IRetrieveUnitValidator)
    private validator: IRetrieveUnitValidator
  ) {}
}
