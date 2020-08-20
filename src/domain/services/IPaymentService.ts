import {Pricing} from '../entities/Pricing';
import {Payment} from '../entities/Payment/Payment';

export interface IPaymentService {
  Create(pricing: Pricing): Promise<Payment>;
  Cancel(payment: Payment): Promise<void>;
}
