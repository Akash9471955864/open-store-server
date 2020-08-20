import {Request, Response} from 'express';

export interface IOtherController {
  sendContactMessage(req: Request, res: Response): Promise<void>;
}
