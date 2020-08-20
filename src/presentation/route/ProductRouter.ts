import {IProductController} from '../controller/Product/IProductController';
import {TYPES} from '../../crosscutting/di/di_types';
import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import {Container} from 'inversify';

export const router = express.Router({
  strict: true,
});

router.use(bodyParser.json());

router.get('/:id', async (req: Request, res: Response) => {
  const container = req.container as Container;
  const controller = container.get<IProductController>(
    TYPES.IProductController
  );
  await controller.Retrieve(req, res);
});
