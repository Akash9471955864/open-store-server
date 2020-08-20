import {Request, Response} from 'express';

export interface IOrderController {
  Insert(req: Request, res: Response): Promise<void>;
  Retrieve(req: Request, res: Response): Promise<void>;
  GetShippingCost(req: Request, res: Response): Promise<void>;
}
