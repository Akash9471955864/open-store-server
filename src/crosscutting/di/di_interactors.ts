import {Interactor as AuthorizePayment} from '../../interactor/AuthorizePayment';
import {Interactor as GetShippingCost} from '../../interactor/GetShippingCost';
import {Interactor as RetrieveProduct} from '../../interactor/RetrieveProduct';
import {Interactor as CapturePayment} from '../../interactor/CapturePayment';
import {Interactor as RetrieveOrder} from '../../interactor/RetrieveOrder';
import {Interactor as RetrieveUnit} from '../../interactor/RetrieveUnit';
import {Interactor as InsertOrder} from '../../interactor/InsertOrder';
import {Interactor as FailPayment} from '../../interactor/FailPayment';
import {Interactor as GetCatalog} from '../../interactor/GetCatalog';
import {Container} from 'inversify';
import {TYPES} from './di_types';

export default function bind(container: Container) {
  // Insert Order
  container
    .bind<InsertOrder>(TYPES.InsertOrderInteractor)
    .to(InsertOrder)
    .inRequestScope();

  // Retrieve Order
  container
    .bind<RetrieveOrder>(TYPES.RetrieveOrderInteractor)
    .to(RetrieveOrder)
    .inRequestScope();

  // Get catalog
  container
    .bind<GetCatalog>(TYPES.GetCatalogInteractor)
    .to(GetCatalog)
    .inRequestScope();

  // Retrieve unit
  container
    .bind<RetrieveUnit>(TYPES.RetrieveUnitInteractor)
    .to(RetrieveUnit)
    .inRequestScope();

  // Get shipping cost
  container
    .bind<GetShippingCost>(TYPES.GetShippingCostInteractor)
    .to(GetShippingCost)
    .inRequestScope();

  // Authorize payment
  container
    .bind<AuthorizePayment>(TYPES.AuthorizePaymentInteractor)
    .to(AuthorizePayment)
    .inRequestScope();

  // Capture payment
  container
    .bind<CapturePayment>(TYPES.CapturePaymentInteractor)
    .to(CapturePayment)
    .inRequestScope();

  // Fail payment
  container
    .bind<FailPayment>(TYPES.FailPaymentInteractor)
    .to(FailPayment)
    .inRequestScope();

  // Retrieve product
  container
    .bind<RetrieveProduct>(TYPES.RetrieveProductInteractor)
    .to(RetrieveProduct)
    .inRequestScope();
}
