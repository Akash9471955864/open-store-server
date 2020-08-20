import {ICatalogController} from '../../presentation/controller/Catalog/ICatalogController';
import {IProductController} from '../../presentation/controller/Product/IProductController';
import {ProductController} from '../../presentation/controller/Product/ProductController';
import {CatalogController} from '../../presentation/controller/Catalog/CatalogController';
import {IStripeController} from '../../presentation/controller/Stripe/IStripeController';
import {StripeController} from '../../presentation/controller/Stripe/StripeController';
import {IOrderController} from '../../presentation/controller/Order/IOrderController';
import {OrderController} from '../../presentation/controller/Order/OrderController';
import {IUnitController} from '../../presentation/controller/Unit/IUnitController';
import {UnitController} from '../../presentation/controller/Unit/UnitController';
import {Container} from 'inversify';
import {TYPES} from './di_types';

export default function bind(container: Container) {
  // Order
  container
    .bind<IOrderController>(TYPES.IOrderController)
    .to(OrderController)
    .inRequestScope();

  // Catalog
  container
    .bind<ICatalogController>(TYPES.ICatalogController)
    .to(CatalogController)
    .inRequestScope();

  // Unit
  container
    .bind<IUnitController>(TYPES.IUnitController)
    .to(UnitController)
    .inRequestScope();

  // Stripe
  container
    .bind<IStripeController>(TYPES.IStripeController)
    .to(StripeController)
    .inRequestScope();

  // Product
  container
    .bind<IProductController>(TYPES.IProductController)
    .to(ProductController)
    .inRequestScope();
}
