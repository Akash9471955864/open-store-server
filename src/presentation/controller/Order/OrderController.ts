import {IRetrieveOrderPresenter} from '../../presenter/IRetrieveOrderPresenter';
import {IInsertOrderPresenter} from '../../presenter/IInsertOrderPresenter';
import {TYPES} from '../../../crosscutting/di/di_types';
import {IOrderController} from './IOrderController';
import {injectable, inject} from 'inversify';
import {Request, Response} from 'express';

import {
  Request as InsertRequest,
  Interactor as InsertInteractor,
} from '../../../interactor/InsertOrder';

import {
  Request as RetrieveRequest,
  Interactor as RetrieveInteractor,
} from '../../../interactor/RetrieveOrder';

import {
  Request as ShippingRequest,
  Interactor as ShippingInteractor,
} from '../../../interactor/GetShippingCost';
import {IGetShippingCostPresenter} from '../../presenter/IGetShippingCostPresenter';

@injectable()
export class OrderController implements IOrderController {
  async Insert(req: Request, res: Response<any>): Promise<void> {
    const request = new InsertRequest();

    request.email = req.body.email;
    request.name = req.body.name;

    request.billing_postal_code = req.body.billing_address?.postal_code;
    request.billing_country = req.body.billing_address?.country;
    request.billing_street = req.body.billing_address?.street;
    request.billing_state = req.body.billing_address?.state;
    request.billing_city = req.body.billing_address?.city;

    request.shipping_postal_code = req.body.shipping_address?.postal_code;
    request.shipping_country = req.body.shipping_address?.country;
    request.shipping_street = req.body.shipping_address?.street;
    request.shipping_state = req.body.shipping_address?.state;
    request.shipping_city = req.body.shipping_address?.city;

    request.shipping_type = req.body.shipping_type;
    request.items = req.body.items;

    const response = await this.insertOrder.Handle(request);
    this.insertPresenter.Handle(response, res);
  }

  async Retrieve(req: Request, res: Response<any>): Promise<void> {
    const request = new RetrieveRequest();

    request.id = req.params.id;

    const response = await this.retrieveOrder.Handle(request);
    this.retrievePresenter.Handle(response, res);
  }

  async GetShippingCost(req: Request, res: Response<any>): Promise<void> {
    const request = new ShippingRequest();

    request.shipping_type = req.body.shipping_type;
    request.units = req.body.units;

    request.shipping_postal_code = req.body.address?.postal_code;
    request.shipping_country = req.body.address?.country;
    request.shipping_street = req.body.address?.street;
    request.shipping_state = req.body.address?.state;
    request.shipping_city = req.body.address?.city;

    const response = await this.shippingCost.Handle(request);
    this.shippingPresenter.Handle(response, res);
  }

  constructor(
    @inject(TYPES.InsertOrderInteractor)
    private insertOrder: InsertInteractor,
    @inject(TYPES.RetrieveOrderInteractor)
    private retrieveOrder: RetrieveInteractor,
    @inject(TYPES.GetShippingCostInteractor)
    private shippingCost: ShippingInteractor,
    @inject(TYPES.IInsertOrderPresenter)
    private insertPresenter: IInsertOrderPresenter,
    @inject(TYPES.IRetrieveOrderPresenter)
    private retrievePresenter: IRetrieveOrderPresenter,
    @inject(TYPES.IGetShippingCostPresenter)
    private shippingPresenter: IGetShippingCostPresenter
  ) {}
}
