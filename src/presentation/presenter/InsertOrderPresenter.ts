import {ProductUnavailableFailure} from '../../crosscutting/failure/ProductUnavailableFailure';
import {InvalidRequestFailure} from '../../crosscutting/failure/InvalidRequestFailure';
import {IDNotFoundFailure} from '../../crosscutting/failure/IDNotFoundFailure';
import {toString as CurrencyToString} from '../../domain/entities/Currency';
import {Response as InteractorReponse} from '../../interactor/InsertOrder';
import {IInsertOrderPresenter} from './IInsertOrderPresenter';
import {Pricing} from '../../domain/entities/Pricing';
import {injectable} from 'inversify';
import {Response} from 'express';
import {Unit} from '../../domain/entities/Unit/Unit';
import {UnitCase} from '../../domain/entities/Unit/UnitCase';
import {UnitShoe} from '../../domain/entities/Unit/UnitShoe';
import {Item} from '../../domain/entities/Item';
import {Tax} from '../../domain/entities/Tax/Tax';
import {TaxCanada} from '../../domain/entities/Tax/TaxCanada';
import {TaxBrazil} from '../../domain/entities/Tax/TaxBrazil';
import {toString} from '../../domain/entities/Payment/PaymentStatus';

@injectable()
export class InsertOrderPresenter implements IInsertOrderPresenter {
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
      }
    } else {
      res.send({
        id: response.id,

        customer: {
          name: response.order!.Customer.Name,
          email: response.order!.Customer.Email,
        },

        shipping: {
          address: response.order!.Shipping.Address,
          price: this.MapPrice(response.order!.Shipping.Price),
        },

        billing: {
          address: response.order!.Billing.Address,
          payment: {
            handler: response.order!.Billing.Payment.getPaymentHandler(),
            param: response.order!.Billing.Payment.getPaymentParam(),
            status: toString(response.order!.Billing.Payment.Status),
          },
          subtotal: response.order!.calculateSubtotal(),
          tax: this.MapTax(response.order!.Billing.Tax),
        },

        items: response.order!.Items.map(this.MapItem, this),
      });
    }
  }
}
