import {IShippingService} from '../../domain/services/ShippingService/IShippingService';
import {ICurrencyService} from '../../domain/services/CurrencyService/ICurrencyService';
import {CurrencyService} from '../../domain/services/CurrencyService/CurrencyService';
import {ShippingService} from '../../domain/services/ShippingService/ShippingService';
import {IBillingService} from '../../domain/services/BillingService/IBillingService';
import {ICatalogService} from '../../domain/services/CatalogService/ICatalogService';
import {CatalogService} from '../../domain/services/CatalogService/CatalogService';
import {BillingService} from '../../domain/services/BillingService/BillingService';
import {IOrderService} from '../../domain/services/OrderService/IOrderService';
import {IStockService} from '../../domain/services/StockService/IStockService';
import {OrderService} from '../../domain/services/OrderService/OrderService';
import {StockService} from '../../domain/services/StockService/StockService';
import {ITaxService} from '../../domain/services/TaxService/ITaxService';
import {IStripeService} from '../../data/services/Stripe/IStripeService';
import {TaxService} from '../../domain/services/TaxService/TaxService';
import {StripeService} from '../../data/services/Stripe/StripeService';
import {IPaymentService} from '../../domain/services/IPaymentService';
import {IEmailService} from '../../data/services/Email/IEmailService';
import {EmailService} from '../../data/services/Email/EmailService';
import {Container} from 'inversify';
import {TYPES} from './di_types';

export default function bind(container: Container) {
  container
    .bind<ICatalogService>(TYPES.ICatalogService)
    .to(CatalogService)
    .inRequestScope();

  container
    .bind<IBillingService>(TYPES.IBillingService)
    .to(BillingService)
    .inRequestScope();

  container
    .bind<ICurrencyService>(TYPES.ICurrencyService)
    .to(CurrencyService)
    .inRequestScope();

  container
    .bind<IOrderService>(TYPES.IOrderService)
    .to(OrderService)
    .inRequestScope();

  container
    .bind<IShippingService>(TYPES.IShippingService)
    .to(ShippingService)
    .inRequestScope();

  container
    .bind<IPaymentService>(TYPES.IPaymentService)
    .to(StripeService)
    .inRequestScope();

  container
    .bind<IStockService>(TYPES.IStockService)
    .to(StockService)
    .inRequestScope();

  container
    .bind<ITaxService>(TYPES.ITaxService)
    .to(TaxService)
    .inRequestScope();

  container
    .bind<IStripeService>(TYPES.IStripeService)
    .to(StripeService)
    .inRequestScope();

  container
    .bind<IEmailService>(TYPES.IEmailService)
    .to(EmailService)
    .inRequestScope();
}
