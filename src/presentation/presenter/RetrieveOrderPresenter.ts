import {ProductUnavailableFailure} from '../../crosscutting/failure/ProductUnavailableFailure';
import {InvalidRequestFailure} from '../../crosscutting/failure/InvalidRequestFailure';
import {toString as OrderStatusToString} from '../../domain/entities/OrderStatus';
import {IDNotFoundFailure} from '../../crosscutting/failure/IDNotFoundFailure';
import {Response as InteractorReponse} from '../../interactor/RetrieveOrder';
import {toString as CurrencyToString} from '../../domain/entities/Currency';
import {IRetrieveOrderPresenter} from './IRetrieveOrderPresenter';
import {TaxCanada} from '../../domain/entities/Tax/TaxCanada';
import {TaxBrazil} from '../../domain/entities/Tax/TaxBrazil';
import {UnitCase} from '../../domain/entities/Unit/UnitCase';
import {UnitShoe} from '../../domain/entities/Unit/UnitShoe';
import {Pricing} from '../../domain/entities/Pricing';
import {Unit} from '../../domain/entities/Unit/Unit';
import {Tax} from '../../domain/entities/Tax/Tax';
import {Item} from '../../domain/entities/Item';
import {injectable} from 'inversify';
import {Response} from 'express';
import {
  toString as PaymentStatusToString,
  PaymentStatus,
} from '../../domain/entities/Payment/PaymentStatus';

@injectable()
export class RetrieveOrderPresenter implements IRetrieveOrderPresenter {
  MapPrice(price: Pricing): any {
    return {
      currency: CurrencyToString(price.Currency),
      price: price.Price,
    };
  }

  MapUnit(unit: Unit): any {
    if (unit instanceof UnitCase) {
      return {
        price: this.MapPrice(unit.Price),
        product: unit.Product,
        device: unit.Device,
        type: 'CASE',
        id: unit.ID,
      };
    }

    if (unit instanceof UnitShoe) {
      return {
        price: this.MapPrice(unit.Price),
        product: unit.Product,
        size: unit.Size,
        type: 'SHOE',
        id: unit.ID,
      };
    }
  }

  MapItem(item: Item): any {
    return {
      price: this.MapPrice(item.Price),
      unit: this.MapUnit(item.Unit),
      quantity: item.Quantity,
    };
  }

  MapTax(tax: Tax): any {
    if (tax instanceof TaxCanada) {
      if (tax.IsHarmonized) {
        return {harmonizedTax: tax.HarmonizedTax, type: 'CA'};
      } else {
        return {
          federalTax: tax.FederalTax,
          provincialTax: tax.ProvincialTax,
          type: 'CA',
        };
      }
    }

    if (tax instanceof TaxBrazil) {
      return {value: tax.Value, type: 'BR'};
    }
  }

  Handle(response: InteractorReponse, res: Response): void {
    if (response.error !== undefined) {
      if (response.error instanceof InvalidRequestFailure) {
        res.status(400).send(response.error);
      } else if (response.error instanceof ProductUnavailableFailure) {
        res.status(403).send(response.error);
      } else if (response.error instanceof IDNotFoundFailure) {
        res.status(404).send(response.error);
      } else {
        res.status(500);
      }

      return;
    }

    // Only send payment if it still needs to be payed
    let payment: any = undefined;
    let paymentStatus = response.order!.Billing.Payment.Status;

    if (paymentStatus === PaymentStatus.CREATED) {
      payment = {
        handler: response.order!.Billing.Payment.getPaymentHandler(),
        param: response.order!.Billing.Payment.getPaymentParam(),
        status: PaymentStatusToString(paymentStatus),
      };
    }

    // Send object
    res.send({
      id: response.order!.ID,
      status: OrderStatusToString(response.order!.Status),

      customer: {
        name: response.order!.Customer.Name,
        email: response.order!.Customer.Email,
      },

      shipping: {
        address: response.order!.Shipping.Address,
        price: this.MapPrice(response.order!.Shipping.Price),
      },

      billing: {
        subtotal: response.order!.calculateSubtotal(),
        tax: this.MapTax(response.order!.Billing.Tax),
        address: response.order!.Billing.Address,
        payment: payment,
      },

      items: response.order!.Items.map(this.MapItem, this),
    });
  }
}
