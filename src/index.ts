import 'reflect-metadata'; // Needs to be placed here in order for DI to work

import {router as catalogRouter} from './presentation/route/CatalogRouter';
import {router as webhookRouter} from './presentation/route/WebhookRouter';
import {router as productRouter} from './presentation/route/ProductRouter';
import {router as assetsRouter} from './presentation/route/AssetsRouter';
import {router as orderRouter} from './presentation/route/OrderRouter';
import {router as unitRouter} from './presentation/route/UnitRouter';
import {dataContext} from './presentation/middleware/dataContext';
import cors from './presentation/middleware/cors';
import express from 'express';

// Initialize Environment (Only development)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Initialize Express
const app = express();

// Add middlewares
app.use(cors);

// Add assets route
app.use('/assets', assetsRouter);

// Add  API routes
const api_router = express.Router();
app.use('/api', api_router);
api_router.use(dataContext);

api_router.use('/catalog', catalogRouter);
api_router.use('/product', productRouter);
api_router.use('/order', orderRouter);
api_router.use('/unit', unitRouter);

// Add webhook route
const webhook_router = express.Router();
webhook_router.use(dataContext);
app.use(webhook_router);

webhook_router.use('/webhook', webhookRouter);

// Start server
const PORT = 1801;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
