import {Request, Response} from 'express';

export interface IProductController {
  all_available(req: Request, res: Response): Promise<void>;
  get(req: Request, res: Response): Promise<void>;
}
