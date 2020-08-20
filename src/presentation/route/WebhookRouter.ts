import {IStripeController} from '../controller/Stripe/IStripeController';
import {TYPES} from '../../crosscutting/di/di_types';
import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import {Container} from 'inversify';

export const router = express.Router({
  strict: true,
});

router.use(bodyParser.raw({type: 'application/json'}));

router.post('/stripe', async (req: Request, res: Response) => {
  const container = req.container as Container;
  const controller = container.get<IStripeController>(TYPES.IStripeController);
  await controller.Handle(req, res);
});
