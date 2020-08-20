import {ICatalogController} from '../controller/Catalog/ICatalogController';
import {TYPES} from '../../crosscutting/di/di_types';
import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import {Container} from 'inversify';

export const router = express.Router({
  strict: true,
});

router.use(bodyParser.json());

router.get('/', async (req: Request, res: Response) => {
  const container = req.container as Container;
  const controller = container.get<ICatalogController>(
    TYPES.ICatalogController
  );
  await controller.Get(req, res);
});
