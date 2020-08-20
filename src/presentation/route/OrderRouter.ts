import {IOrderController} from '../controller/Order/IOrderController';
import {TYPES} from '../../crosscutting/di/di_types';
import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import {Container} from 'inversify';

export const router = express.Router({
  strict: true,
});

router.use(bodyParser.json());

router.post('/', async (req: Request, res: Response) => {
  const container = req.container as Container;
  const controller = container.get<IOrderController>(TYPES.IOrderController);
  await controller.Insert(req, res);
});

router.post('/shipping', async (req: Request, res: Response) => {
  const container = req.container as Container;
  const controller = container.get<IOrderController>(TYPES.IOrderController);
  await controller.GetShippingCost(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
  const container = req.container as Container;
  const controller = container.get<IOrderController>(TYPES.IOrderController);
  await controller.Retrieve(req, res);
});
