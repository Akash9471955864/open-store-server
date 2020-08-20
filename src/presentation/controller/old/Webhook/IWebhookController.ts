import {Request, Response} from 'express';

export interface IWebhookController {
  handle_stripe(req: Request, res: Response): Promise<void>;
}
