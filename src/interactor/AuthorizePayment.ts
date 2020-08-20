import {IPaymentStripeRepository} from '../domain/repositories/IPaymentRepository/IPaymentStripeRepository';
import {ProductUnavailableFailure} from '../crosscutting/failure/ProductUnavailableFailure';
import {IDNotFoundFailure} from '../crosscutting/failure/IDNotFoundFailure';
import {IStockService} from '../domain/services/StockService/IStockService';
import {IOrderRepository} from '../domain/repositories/IOrderRepository';
import {IStripeService} from '../data/services/Stripe/IStripeService';
import {IUnitOfWork} from '../crosscutting/unitOfWork/IUnitOfWork';
import {Failure} from '../crosscutting/failure/Failure';
import {TYPES} from '../crosscutting/di/di_types';
import {Order} from '../domain/entities/Order';
import {injectable, inject} from 'inversify';

export class Request {
  public paymentIntent?: string;
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

  private async CheckAvailability(order: Order): Promise<boolean> {
    for (let item of order.Items) {
      const available = await this.stockService.CheckAvailability(
        item.Unit,
        item.Quantity
      );

      if (available === false) return false;
    }

    return true;
  }

  private async UpdatePayment(intent: string): Promise<void> {
    const payment = await this.paymentStripeRepository.RetrieveByIntent(intent);
    if (payment === undefined) {
      this.error = new IDNotFoundFailure([intent]);
      return;
    }
    payment.Authorize();
    await this.paymentStripeRepository.Update(payment);
  }

  private async UpdateOrder(order: Order): Promise<void> {
    order.Reserve();
    await this.orderRepository.Update(order);
    await this.stockService.Reserve(order.Items);
  }

  public async Handle(request: Request): Promise<Response> {
    // Start unit of work
    await this.unitOfWork.begin();

    // Retrieve order
    const order = await this.GetOrder(request.paymentIntent!);
    if (order === undefined) {
      await this.unitOfWork.revert();
      return {error: this.error};
    }

    // Check order availability
    if (!this.CheckAvailability(order)) {
      return {error: new ProductUnavailableFailure([])};
    }

    // Change payment status
    await this.UpdatePayment(request.paymentIntent!);
    if (this.error !== undefined) {
      await this.unitOfWork.revert();
      return {error: this.error};
    }

    // Reserve order
    await this.UpdateOrder(order);
    if (this.error !== undefined) {
      await this.unitOfWork.revert();
      return {error: this.error};
    }

    // Commit unit of work
    await this.unitOfWork.commit();

    // Trigger payment capturing
    await this.stripeService.capturePaymentIntent(request.paymentIntent!);

    return {};
  }

  private error?: Failure;

  constructor(
    @inject(TYPES.IOrderRepository) private orderRepository: IOrderRepository,
    @inject(TYPES.IStripeService) private stripeService: IStripeService,
    @inject(TYPES.IStockService) private stockService: IStockService,
    @inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork,
    @inject(TYPES.IPaymentStripeRepository)
    private paymentStripeRepository: IPaymentStripeRepository
  ) {}
}
