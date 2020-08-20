import {IRetrieveOrderPresenter} from '../../presentation/presenter/IRetrieveOrderPresenter';
import {RetrieveOrderPresenter} from '../../presentation/presenter/RetrieveOrderPresenter';
import {IRetrieveUnitPresenter} from '../../presentation/presenter/IRetrieveUnitPresenter';
import {IInsertOrderPresenter} from '../../presentation/presenter/IInsertOrderPresenter';
import {RetrieveUnitPresenter} from '../../presentation/presenter/RetrieveUnitPresenter';
import {InsertOrderPresenter} from '../../presentation/presenter/InsertOrderPresenter';
import {IGetCatalogPresenter} from '../../presentation/presenter/IGetCatalogPresenter';
import {GetCatalogPresenter} from '../../presentation/presenter/GetCatalogPresenter';
import {Container} from 'inversify';
import {TYPES} from './di_types';
import {IGetShippingCostPresenter} from '../../presentation/presenter/IGetShippingCostPresenter';
import {GetShippingCostPresenter} from '../../presentation/presenter/GetShippingCostPresenter';
import {IRetrieveProductPresenter} from '../../presentation/presenter/IRetrieveProductPresenter';
import {RetrieveProductPresenter} from '../../presentation/presenter/RetrieveProductPresenter';

export default function bind(container: Container) {
  container
    .bind<IInsertOrderPresenter>(TYPES.IInsertOrderPresenter)
    .to(InsertOrderPresenter)
    .inRequestScope();

  container
    .bind<IRetrieveOrderPresenter>(TYPES.IRetrieveOrderPresenter)
    .to(RetrieveOrderPresenter)
    .inRequestScope();

  container
    .bind<IGetCatalogPresenter>(TYPES.IGetCatalogPresenter)
    .to(GetCatalogPresenter)
    .inRequestScope();

  container
    .bind<IRetrieveUnitPresenter>(TYPES.IRetrieveUnitPresenter)
    .to(RetrieveUnitPresenter)
    .inRequestScope();

  container
    .bind<IGetShippingCostPresenter>(TYPES.IGetShippingCostPresenter)
    .to(GetShippingCostPresenter)
    .inRequestScope();

  container
    .bind<IRetrieveProductPresenter>(TYPES.IRetrieveProductPresenter)
    .to(RetrieveProductPresenter)
    .inRequestScope();
}
