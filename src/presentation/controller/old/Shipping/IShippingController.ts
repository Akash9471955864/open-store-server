import {Request, Response} from 'express';

export interface IShippingController {
  cost(req: Request, res: Response): Promise<void>;
}
