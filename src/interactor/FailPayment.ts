import {IPaymentStripeRepository} from '../domain/repositories/IPaymentRepository/IPaymentStripeRepository';
import {IDNotFoundFailure} from '../crosscutting/failure/IDNotFoundFailure';
import {IStockService} from '../domain/services/StockService/IStockService';
import {IOrderRepository} from '../domain/repositories/IOrderRepository';
import {IUnitOfWork} from '../crosscutting/unitOfWork/IUnitOfWork';
import {IEmailService} from '../data/services/Email/IEmailService';
import {OrderStatus} from '../domain/entities/OrderStatus';
import {Failure} from '../crosscutting/failure/Failure';
import {TYPES} from '../crosscutting/di/di_types';
import {injectable, inject} from 'inversify';

export class Request {
  paymentIntent?: string;
}

export class Response {
  error?: Failure;
}

@injectable()
export class Interactor {
  async Handle(request: Request): Promise<Response> {
    // Start transaction
    await this.unitOfWork.begin();

    // Retrieve order ID
    const orderID = await this.paymentRepository.GetOrderIdByIntent(
      request.paymentIntent!
    );
    if (orderID === undefined) {
      await this.unitOfWork.revert();
      return {
        error: new IDNotFoundFailure([request.paymentIntent!]),
      };
    }

    // Retrieve order
    const order = await this.orderRepository.Retrieve(orderID);
    if (order === undefined) {
      await this.unitOfWork.revert();
      return {
        error: new IDNotFoundFailure([request.paymentIntent!]),
      };
    }

    // If the order was reserved, release it
    if (order.Status === OrderStatus.RESERVED) {
      await this.stockService.Release(order.Items);

      order.Release();
      await this.orderRepository.Update(order);

      await this.unitOfWork.commit();
      this.emailService.sendPaymentFailedEmail(order);
    }

    // If the order was not released, leave it to the client
    else {
      await this.unitOfWork.revert();
    }

    return {};
  }

  constructor(
    @inject(TYPES.IPaymentStripeRepository)
    private paymentRepository: IPaymentStripeRepository,
    @inject(TYPES.IOrderRepository)
    private orderRepository: IOrderRepository,
    @inject(TYPES.IStockService)
    private stockService: IStockService,
    @inject(TYPES.IEmailService)
    private emailService: IEmailService,
    @inject(TYPES.IUnitOfWork)
    private unitOfWork: IUnitOfWork
  ) {}
}
