import {Request, Response} from 'express';

export interface IStripeController {
  Handle(req: Request, res: Response): Promise<void>;
}
