import {IPaymentStripeRepository} from '../domain/repositories/IPaymentRepository/IPaymentStripeRepository';
import {IDNotFoundFailure} from '../crosscutting/failure/IDNotFoundFailure';
import {IOrderRepository} from '../domain/repositories/IOrderRepository';
import {IUnitOfWork} from '../crosscutting/unitOfWork/IUnitOfWork';
import {IEmailService} from '../data/services/Email/IEmailService';
import {Failure} from '../crosscutting/failure/Failure';
import {TYPES} from '../crosscutting/di/di_types';
import {Order} from '../domain/entities/Order';
import {injectable, inject} from 'inversify';

export class Request {
  public paymentId?: string;
}

export class Response {
  public error?: Failure;
}

@injectable()
export class Interactor {
  private async GetOrder(intent: string): Promise<Order | undefined> {
    const orderID = await this.paymentStripeRepository.GetOrderIdByIntent(
      intent
    );
    if (orderID === undefined) {
      this.error = new IDNotFoundFailure([intent]);
      return undefined;
    }

    const order = await this.orderRepository.Retrieve(orderID);
    if (order === undefined) {
      this.error = new IDNotFoundFailure([orderID]);
      return undefined;
    }

    return order;
  }

  private async UpdatePayment(intent: string): Promise<void> {
    const payment = await this.paymentStripeRepository.RetrieveByIntent(intent);
    if (payment === undefined) {
      this.error = new IDNotFoundFailure([intent]);
      return;
    }
    payment.Capture();
    await this.paymentStripeRepository.Update(payment);
  }

  public async Handle(request: Request): Promise<Response> {
    // Start unit of work
    await this.unitOfWork.begin();

    // Change payment status
    await this.UpdatePayment(request.paymentId!);
    if (this.error !== undefined) {
      await this.unitOfWork.revert();
      return {
        error: this.error,
      };
    }

    // Retrieve order
    const order = await this.GetOrder(request.paymentId!);
    if (order === undefined) {
      await this.unitOfWork.revert();
      return {
        error: this.error,
      };
    }

    // Commit unit of work
    await this.unitOfWork.commit();

    // Send emails
    this.emailService.sendInternalOrderPlacedEmail(order);
    this.emailService.sendOrderConfirmedEmail(order);

    return {};
  }

  private error?: Failure;

  constructor(
    @inject(TYPES.IOrderRepository) private orderRepository: IOrderRepository,
    @inject(TYPES.IEmailService) private emailService: IEmailService,
    @inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork,
    @inject(TYPES.IPaymentStripeRepository)
    private paymentStripeRepository: IPaymentStripeRepository
  ) {}
}
