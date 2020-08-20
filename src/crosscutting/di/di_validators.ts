import {IGetShippingCostValidator} from '../../validation/validators/IGetShippingCostValidator';
import {IRetrieveProductValidator} from '../../validation/validators/IRetrieveProductValidator';
import {GetShippingCostValidator} from '../../validation/validators/GetShippingCostValidator';
import {RetrieveProductValidator} from '../../validation/validators/RetrieveProductValidator';
import {IRetrieveOrderValidator} from '../../validation/validators/IRetrieveOrderValidator';
import {RetrieveOrderValidator} from '../../validation/validators/RetrieveOrderValidator';
import {IRetrieveUnitValidator} from '../../validation/validators/IRetrieveUnitValidator';
import {RetrieveUnitValidator} from '../../validation/validators/RetrieveUnitValidator';
import {IInsertOrderValidator} from '../../validation/validators/IInsertOrderValidator';
import {InsertOrderValidator} from '../../validation/validators/InsertOrderValidator';
import {IGetCatalogValidator} from '../../validation/validators/IGetCatalogValidator';
import {GetCatalogValidator} from '../../validation/validators/GetCatalogValidator';
import {Container} from 'inversify';
import {TYPES} from './di_types';

export default function bind(container: Container) {
  container
    .bind<IInsertOrderValidator>(TYPES.IInsertOrderValidator)
    .to(InsertOrderValidator)
    .inRequestScope();

  container
    .bind<IRetrieveOrderValidator>(TYPES.IRetrieveOrderValidator)
    .to(RetrieveOrderValidator)
    .inRequestScope();

  container
    .bind<IGetCatalogValidator>(TYPES.IGetCatalogValidator)
    .to(GetCatalogValidator)
    .inRequestScope();

  container
    .bind<IRetrieveUnitValidator>(TYPES.IRetrieveUnitValidator)
    .to(RetrieveUnitValidator)
    .inRequestScope();

  container
    .bind<IGetShippingCostValidator>(TYPES.IGetShippingCostValidator)
    .to(GetShippingCostValidator)
    .inRequestScope();

  container
    .bind<IRetrieveProductValidator>(TYPES.IRetrieveProductValidator)
    .to(RetrieveProductValidator)
    .inRequestScope();
}
