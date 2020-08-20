import {Request, Response} from 'express';

export interface IUnitController {
  get(req: Request, res: Response): Promise<void>;
}
