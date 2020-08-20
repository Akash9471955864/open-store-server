import {Request, Response} from 'express';

export interface IProductController {
  Retrieve(req: Request, res: Response): Promise<void>;
}
