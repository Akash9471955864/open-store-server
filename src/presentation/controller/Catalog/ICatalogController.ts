import {Request, Response} from 'express';

export interface ICatalogController {
  Get(req: Request, res: Response): Promise<void>;
}
