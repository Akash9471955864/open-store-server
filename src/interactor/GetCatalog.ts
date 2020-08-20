import {InvalidRequestFailure} from '../crosscutting/failure/InvalidRequestFailure';
import {IGetCatalogValidator} from '../validation/validators/IGetCatalogValidator';
import {ICatalogService} from '../domain/services/CatalogService/ICatalogService';
import {Failure} from '../crosscutting/failure/Failure';
import {fromString} from '../domain/entities/Country';
import {Catalog} from '../domain/entities/Catalog';
import {TYPES} from '../crosscutting/di/di_types';
import {inject, injectable} from 'inversify';

export class Request {
  country?: string;
  date?: Date;
}

export class Response {
  error?: Failure;
  catalog?: Catalog;
}

@injectable()
export class Interactor {
  async Handle(request: Request): Promise<Response> {
    const validation = this.validator.Validate(request);
    if (!validation.Valid) {
      return {error: new InvalidRequestFailure(validation)};
    }

    const country = fromString(request.country!);
    const date = request.date;

    const catalog = await this.service.GetCatalog(country!, date!);

    return {catalog};
  }

  constructor(
    @inject(TYPES.ICatalogService)
    private service: ICatalogService,
    @inject(TYPES.IGetCatalogValidator)
    private validator: IGetCatalogValidator
  ) {}
}
