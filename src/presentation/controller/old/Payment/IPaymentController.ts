import {Request, Response} from 'express';

export interface IPaymentController {
  calculateTax(req: Request, res: Response): Promise<void>;
}
