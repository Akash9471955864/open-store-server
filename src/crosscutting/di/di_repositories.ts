import {IPaymentStripeRepository} from '../../domain/repositories/IPaymentRepository/IPaymentStripeRepository';
import {IProductShoeRepository} from '../../domain/repositories/IProductRepository/IProductShoeRepository';
import {IProductCaseRepository} from '../../domain/repositories/IProductRepository/IProductCaseRepository';
import {PaymentStripeRepository} from '../../data/repositories/PaymentRepository/PaymentStripeRepository';
import {ProductShoeRepository} from '../../data/repositories/ProductRepository/ProductShoeRepository';
import {ProductCaseRepository} from '../../data/repositories/ProductRepository/ProductCaseRepository';
import {IPaymentRepository} from '../../domain/repositories/IPaymentRepository/IPaymentRepository';
import {IProductRepository} from '../../domain/repositories/IProductRepository/IProductRepository';
import {ITaxCanadaRepository} from '../../domain/repositories/ITaxRepository/ITaxCanadaRepository';
import {ITaxBrazilRepository} from '../../domain/repositories/ITaxRepository/ITaxBrazilRepository';
import {IUnitShoeRepository} from '../../domain/repositories/IUnitRepository/IUnitShoeRepository';
import {IUnitCaseRepository} from '../../domain/repositories/IUnitRepository/IUnitCaseRepository';
import {PaymentRepository} from '../../data/repositories/PaymentRepository/PaymentRepository';
import {ProductRepository} from '../../data/repositories/ProductRepository/ProductRepository';
import {TaxCanadaRepository} from '../../data/repositories/TaxRepository/TaxCanadaRepository';
import {TaxBrazilRepository} from '../../data/repositories/TaxRepository/TaxBrazilRepository';
import {UnitShoeRepository} from '../../data/repositories/UnitRepository/UnitShoeRepository';
import {UnitCaseRepository} from '../../data/repositories/UnitRepository/UnitCaseRepository';
import {IUnitRepository} from '../../domain/repositories/IUnitRepository/IUnitRepository';
import {ITaxRepository} from '../../domain/repositories/ITaxRepository/ITaxRepository';
import {UnitRepository} from '../../data/repositories/UnitRepository/UnitRepository';
import {TaxRepository} from '../../data/repositories/TaxRepository/TaxRepository';
import {ICustomerRepository} from '../../domain/repositories/ICustomerRepository';
import {IShippingRepository} from '../../domain/repositories/IShippingRepository';
import {IAddressRepository} from '../../domain/repositories/IAddressRepository';
import {IBillingRepository} from '../../domain/repositories/IBillingRepository';
import {IPricingRepository} from '../../domain/repositories/IPricingRepository';
import {CustomerRepository} from '../../data/repositories/CustomerRepository';
import {ShippingRepository} from '../../data/repositories/ShippingRepository';
import {AddressRepository} from '../../data/repositories/AddressRepository';
import {BillingRepository} from '../../data/repositories/BillingRepository';
import {IOrderRepository} from '../../domain/repositories/IOrderRepository';
import {PricingRepository} from '../../data/repositories/PricingRepository';
import {IStockRepository} from '../../domain/repositories/IStockRepository';
import {IItemRepository} from '../../domain/repositories/IItemRepository';
import {OrderRepository} from '../../data/repositories/OrderRepository';
import {StockRepository} from '../../data/repositories/StockRepository';
import {ItemRepository} from '../../data/repositories/ItemRepository';
import {Container} from 'inversify';
import {TYPES} from './di_types';
import {ICatalogRepository} from '../../domain/repositories/ICatalogRepository';
import {CatalogRepository} from '../../data/repositories/CatalogRepository';

export default function bind(container: Container) {
  // Payment
  container
    .bind<IPaymentRepository>(TYPES.IPaymentRepository)
    .to(PaymentRepository)
    .inRequestScope();

  container
    .bind<IPaymentStripeRepository>(TYPES.IPaymentStripeRepository)
    .to(PaymentStripeRepository)
    .inRequestScope();

  // Product
  container
    .bind<IProductShoeRepository>(TYPES.IProductShoeRepository)
    .to(ProductShoeRepository)
    .inRequestScope();

  container
    .bind<IProductCaseRepository>(TYPES.IProductCaseRepository)
    .to(ProductCaseRepository)
    .inRequestScope();

  container
    .bind<IProductRepository>(TYPES.IProductRepository)
    .to(ProductRepository)
    .inRequestScope();

  // Tax
  container
    .bind<ITaxCanadaRepository>(TYPES.ITaxCanadaRepository)
    .to(TaxCanadaRepository)
    .inRequestScope();

  container
    .bind<ITaxBrazilRepository>(TYPES.ITaxBrazilRepository)
    .to(TaxBrazilRepository)
    .inRequestScope();

  container
    .bind<ITaxRepository>(TYPES.ITaxRepository)
    .to(TaxRepository)
    .inRequestScope();

  // Unit
  container
    .bind<IUnitShoeRepository>(TYPES.IUnitShoeRepository)
    .to(UnitShoeRepository)
    .inRequestScope();

  container
    .bind<IUnitCaseRepository>(TYPES.IUnitCaseRepository)
    .to(UnitCaseRepository)
    .inRequestScope();

  container
    .bind<IUnitRepository>(TYPES.IUnitRepository)
    .to(UnitRepository)
    .inRequestScope();

  // Others
  container
    .bind<IAddressRepository>(TYPES.IAddressRepository)
    .to(AddressRepository)
    .inRequestScope();

  container
    .bind<IBillingRepository>(TYPES.IBillingRepository)
    .to(BillingRepository)
    .inRequestScope();

  container
    .bind<ICustomerRepository>(TYPES.ICustomerRepository)
    .to(CustomerRepository)
    .inRequestScope();

  container
    .bind<IItemRepository>(TYPES.IItemRepository)
    .to(ItemRepository)
    .inRequestScope();

  container
    .bind<IOrderRepository>(TYPES.IOrderRepository)
    .to(OrderRepository)
    .inRequestScope();

  container
    .bind<IPricingRepository>(TYPES.IPricingRepository)
    .to(PricingRepository)
    .inRequestScope();

  container
    .bind<IShippingRepository>(TYPES.IShippingRepository)
    .to(ShippingRepository)
    .inRequestScope();

  container
    .bind<IStockRepository>(TYPES.IStockRepository)
    .to(StockRepository)
    .inRequestScope();

  container
    .bind<ICatalogRepository>(TYPES.ICatalogRepository)
    .to(CatalogRepository)
    .inRequestScope();
}
