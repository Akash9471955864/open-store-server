import {IRetrieveOrderValidator} from '../validation/validators/IRetrieveOrderValidator';
import {InvalidRequestFailure} from '../crosscutting/failure/InvalidRequestFailure';
import {IDNotFoundFailure} from '../crosscutting/failure/IDNotFoundFailure';
import {IOrderRepository} from '../domain/repositories/IOrderRepository';
import {Failure} from '../crosscutting/failure/Failure';
import {TYPES} from '../crosscutting/di/di_types';
import {Order} from '../domain/entities/Order';
import {injectable, inject} from 'inversify';

export class Request {
  public id?: string;
}

export class Response {
  public error?: Failure;
  public order?: Order;
}

@injectable()
export class Interactor {
  async Handle(request: Request): Promise<Response> {
    const validation = this.validator.Validate(request);
    if (!validation.Valid) {
      return {error: new InvalidRequestFailure(validation)};
    }

    const id = request.id!;
    const order = await this.repository.Retrieve(id);

    if (order === undefined) return {error: new IDNotFoundFailure([id])};

    const response = new Response();
    response.order = order;

    return response;
  }

  constructor(
    @inject(TYPES.IOrderRepository)
    private repository: IOrderRepository,
    @inject(TYPES.IRetrieveOrderValidator)
    private validator: IRetrieveOrderValidator
  ) {}
}
