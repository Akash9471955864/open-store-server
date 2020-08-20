import {DataContextPool} from '../dataContext/DataContextPool';
import {Container} from 'inversify';

import bind_repositories from './di_repositories';
import bind_interactors from './di_interactors';
import bind_controllers from './di_controllers';
import bind_validators from './di_validators';
import bind_presenters from './di_presenters';
import bind_services from './di_services';

import {IUnitOfWork} from '../unitOfWork/IUnitOfWork';
import {UnitOfWork} from '../unitOfWork/UnitOfWork';
import {TYPES} from './di_types';

export const di_container = new Container();
export default di_container;

// Data Context
di_container.bind(DataContextPool).toSelf().inSingletonScope();

// Repositories
bind_repositories(di_container);

// Interactors
bind_interactors(di_container);

// Controllers
bind_controllers(di_container);

// Validators
bind_validators(di_container);

// Presenters
bind_presenters(di_container);

// Services
bind_services(di_container);

// Unit of Work
di_container
  .bind<IUnitOfWork>(TYPES.IUnitOfWork)
  .to(UnitOfWork)
  .inRequestScope();
