import {Request, Response} from 'express';

export interface IUnitController {
  Retrieve(req: Request, res: Response): Promise<void>;
}
