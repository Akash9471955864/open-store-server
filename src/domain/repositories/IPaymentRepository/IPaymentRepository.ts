import {Payment} from '../../entities/Payment/Payment';

export interface IPaymentRepository {
  Retrieve(id: string): Promise<Payment | undefined>;
  Insert(payment: Payment): Promise<string>;
  Update(payment: Payment): Promise<void>;
}
