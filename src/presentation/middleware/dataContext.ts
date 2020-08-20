// import {makeLoggerMiddleware} from 'inversify-logger-middleware';
import {IDataContext} from '../../crosscutting/dataContext/IDataContext';
import {DataContextPool} from '../../crosscutting/dataContext';
import {ParamsDictionary} from 'express-serve-static-core';
import {di_container} from '../../crosscutting/di/di';
import {TYPES} from '../../crosscutting/di/di_types';
import {RequestHandler} from 'express';
import {Container} from 'inversify';

export const dataContext: RequestHandler<ParamsDictionary> = async (
  req,
  res,
  next
) => {
  // Attaches a constant DataContext object to a new DI container
  // Sends the DI container scoped to this request forward

  const pool = di_container.get(DataContextPool);
  let context: IDataContext;

  try {
    context = await pool.getContext();
  } catch (e) {
    console.error('[!] Failed to connect to data context!');
    res.sendStatus(500);
    console.error(e);
    return;
  }

  const container = new Container();
  container.bind<IDataContext>(TYPES.IDataContext).toConstantValue(context);
  container.parent = di_container;
  req.container = container;

  // let logger = makeLoggerMiddleware();
  // container.applyMiddleware(logger);

  next();

  // Makes sure that the context has been properly discarded after use
  context.release();
};
