import {AuthorizePaymentRequestMessage} from '../../../../interactor/old/Payment/AuthorizePayment/AuthorizePaymentRequestMessage';
import {CapturedPaymentRequestMessage} from '../../../../interactor/old/Payment/CapturedPayment/CapturedPaymentRequestMessage';
import {AuthorizePaymentInteractor} from '../../../../interactor/old/Payment/AuthorizePayment/AuthorizePaymentInteractor';
import {FailedPaymentRequestMessage} from '../../../../interactor/old/Payment/FailedPayment/FailedPaymentRequestMessage';
import {CancelPaymentRequestMessage} from '../../../../interactor/old/Payment/CancelPayment/CancelPaymentRequestMessage';
import {CapturedPaymentInteractor} from '../../../../interactor/old/Payment/CapturedPayment/CapturedPaymentInteractor';
import {FailedPaymentInteractor} from '../../../../interactor/old/Payment/FailedPayment/FailedPaymentInteractor';
import {CancelPaymentInteractor} from '../../../../interactor/old/Payment/CancelPayment/CancelPaymentInteractor';
import {IStripeService} from '../../../../data/services/Stripe/IStripeService';
import {IWebhookController} from './IWebhookController';
import {TYPES} from '../../../../crosscutting/di/di_types';
import {injectable, inject} from 'inversify';
import {Request, Response} from 'express';
import Stripe from 'stripe';

@injectable()
export class WebhookController implements IWebhookController {
  async handle_stripe(req: Request, res: Response): Promise<void> {
    const signature = req.headers['stripe-signature'];
    if (!signature) {
      res.sendStatus(400);
      return;
    }

    const content = req.body;
    let event: Stripe.Event;

    try {
      event = this.stripeService.buildEvent(content, signature);
    } catch (e) {
      console.error(e);
      res.send(400);
      return;
    }

    let message;
    let paymentIntent;

    switch (event.type) {
      case 'payment_intent.amount_capturable_updated':
        paymentIntent = event.data.object as Stripe.PaymentIntent;
        message = new AuthorizePaymentRequestMessage(paymentIntent.id);
        await this.authorizePaymentInteractor.handle(message);
        break;
      case 'payment_intent.payment_failed':
        paymentIntent = event.data.object as Stripe.PaymentIntent;
        message = new FailedPaymentRequestMessage(
          paymentIntent.id,
          paymentIntent.status
        );
        await this.failedPaymentInteractor.handle(message);
      case 'payment_intent.canceled':
        paymentIntent = event.data.object as Stripe.PaymentIntent;
        message = new CancelPaymentRequestMessage(paymentIntent.id);
        await this.cancelPaymentInteractor.handle(message);
        break;
      case 'charge.captured':
        const charge = event.data.object as Stripe.Charge;
        message = new CapturedPaymentRequestMessage(charge.payment_intent!);
        await this.capturedPaymentInteractor.handle(message);
        break;
      default:
        res.sendStatus(400);
        return;
    }

    res.send({received: true});
  }

  constructor(
    @inject(TYPES.IStripeService) private stripeService: IStripeService,
    @inject(TYPES.AuthorizePaymentInteractor)
    private authorizePaymentInteractor: AuthorizePaymentInteractor,
    @inject(TYPES.CapturedPaymentInteractor)
    private capturedPaymentInteractor: CapturedPaymentInteractor,
    @inject(TYPES.FailedPaymentInteractor)
    private failedPaymentInteractor: FailedPaymentInteractor,
    @inject(TYPES.CancelPaymentInteractor)
    private cancelPaymentInteractor: CancelPaymentInteractor
  ) {}
}
