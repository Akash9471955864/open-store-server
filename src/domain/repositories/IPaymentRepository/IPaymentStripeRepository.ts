import {PaymentStripe} from '../../entities/Payment/Stripe/PaymentStripe';

export interface IPaymentStripeRepository {
  RetrieveByIntent(intent: string): Promise<PaymentStripe | undefined>;
  GetOrderIdByIntent(intent: string): Promise<string | undefined>;
  Insert(id: string, payment: PaymentStripe): Promise<string>;
  Retrieve(id: string): Promise<PaymentStripe | undefined>;
  Update(payment: PaymentStripe): Promise<void>;
}
