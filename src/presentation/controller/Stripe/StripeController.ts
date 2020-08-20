import {IStripeService} from '../../../data/services/Stripe/IStripeService';
import {TYPES} from '../../../crosscutting/di/di_types';
import {IStripeController} from './IStripeController';
import {injectable, inject} from 'inversify';
import {Request, Response} from 'express';
import Stripe from 'stripe';

import {
  Interactor as AuthorizeInteractor,
  Request as AuthorizeRequest,
} from '../../../interactor/AuthorizePayment';

import {
  Interactor as CaptureInteractor,
  Request as CaptureRequest,
} from '../../../interactor/CapturePayment';

import {
  Interactor as FailInteractor,
  Request as FailRequest,
} from '../../../interactor/FailPayment';

@injectable()
export class StripeController implements IStripeController {
  private async HandleAuthorization(event: Stripe.Event) {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const message: AuthorizeRequest = {paymentIntent: paymentIntent.id};

    console.log(`> Received authorization for payment ${paymentIntent.id}`);

    await this.authorizeInteractor.Handle(message);
  }

  private async HandleCapture(event: Stripe.Event) {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const message: CaptureRequest = {paymentId: paymentIntent.id};

    console.log(`> Received capture for payment ${paymentIntent.id}`);

    await this.captureInteractor.Handle(message);
  }

  private async HandleFailure(event: Stripe.Event) {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const message: FailRequest = {paymentIntent: paymentIntent.id};
    await this.failInteractor.Handle(message);
  }

  async Handle(req: Request, res: Response): Promise<void> {
    // Check request signature
    const signature = req.headers['stripe-signature'];
    if (signature === undefined) {
      res.sendStatus(400);
      return;
    }

    // Build event
    let event: Stripe.Event;

    try {
      event = this.service.buildEvent(req.body, signature);
    } catch (e) {
      res.sendStatus(400);
      console.error(e);
      return;
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.amount_capturable_updated':
        await this.HandleAuthorization(event);
        break;
      case 'payment_intent.payment_failed':
        await this.HandleFailure(event);
        break;
      case 'payment_intent.succeeded':
        await this.HandleCapture(event);
        break;
    }

    res.send({received: true});
  }

  constructor(
    @inject(TYPES.IStripeService) private service: IStripeService,
    @inject(TYPES.AuthorizePaymentInteractor)
    private authorizeInteractor: AuthorizeInteractor,
    @inject(TYPES.CapturePaymentInteractor)
    private captureInteractor: CaptureInteractor,
    @inject(TYPES.FailPaymentInteractor)
    private failInteractor: FailInteractor
  ) {}
}
