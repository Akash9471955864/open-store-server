import {IPaymentStripeRepository} from '../domain/repositories/IPaymentRepository/IPaymentStripeRepository';
import {PaymentStripe} from '../domain/entities/Payment/Stripe/PaymentStripe';
import {IDNotFoundFailure} from '../crosscutting/failure/IDNotFoundFailure';
import {IOrderRepository} from '../domain/repositories/IOrderRepository';
import {IPaymentService} from '../domain/services/IPaymentService';
import {IUnitOfWork} from '../crosscutting/unitOfWork/IUnitOfWork';
import {Failure} from '../crosscutting/failure/Failure';
import {TYPES} from '../crosscutting/di/di_types';
import {inject, injectable} from 'inversify';

export class Request {
  public paymentIntent?: string;
}

export class Response {
  public error?: Failure;
}

@injectable()
export class Interactor {
  public async Handle(request: Request): Promise<Response> {
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

    // Cancel order and payment
    this.paymentService.Cancel(order.Billing.Payment);
    order.Cancel();

    // Update payment
    await this.paymentRepository.Update(order.Billing.Payment as PaymentStripe);

    // Update order
    await this.orderRepository.Update(order);

    // Commit transaction
    await this.unitOfWork.commit();

    return {};
  }

  constructor(
    @inject(TYPES.IPaymentStripeRepository)
    private paymentRepository: IPaymentStripeRepository,
    @inject(TYPES.IOrderRepository)
    private orderRepository: IOrderRepository,
    @inject(TYPES.IPaymentService)
    private paymentService: IPaymentService,
    @inject(TYPES.IUnitOfWork)
    private unitOfWork: IUnitOfWork
  ) {}
}
