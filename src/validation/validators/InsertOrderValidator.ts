import {IInsertOrderValidator} from './IInsertOrderValidator';
import {ValidEmailAddress} from '../rules/ValidEmailAddress';
import {ValidShippingType} from '../rules/ValidShippingType';
import {ValidPostalCode} from '../rules/ValidPostalCode';
import {NonEmptyString} from '../rules/NonEmptyString';
import {Request} from '../../interactor/InsertOrder';
import {ValidCountry} from '../rules/ValidCountry';
import {NoDuplicate} from '../rules/NoDuplicate';
import {GreaterThan} from '../rules/GreaterThan';
import {ValidID} from '../rules/ValidID';
import {Validator} from '../Validator';
import {injectable} from 'inversify';
import {All} from '../rules/All';

@injectable()
export class InsertOrderValidator extends Validator<Request>
  implements IInsertOrderValidator {
  constructor() {
    super();

    // Customer
    this.AddRule(new GreaterThan(1), r => r.name?.length, 'Customer Name');
    this.AddRule(new ValidEmailAddress(), r => r.email, 'Customer Email');
    this.AddRule(new NonEmptyString(), r => r.name, 'Customer Name');

    // Items
    this.AddRule(
      All.ApplyWithSelector<[string, number][], [string, number], string>(
        new ValidID(),
        x => x[0]
      ),
      r => r.items,
      'Item IDs'
    );
    this.AddRule(
      All.ApplyWithSelector<[string, number][], [string, number], number>(
        new GreaterThan(0),
        x => x[1]
      ),
      r => r.items,
      'Item Quantities'
    );
    this.AddRule(new GreaterThan(0), r => r.items?.length, 'Number of Items');
    this.AddRule(new NoDuplicate(x => x[0]), r => r.items, 'Item IDs');

    // Billing Address
    this.AddRule(
      new NonEmptyString(),
      r => r.billing_postal_code,
      'Billing Postal Code'
    );
    this.AddRule(
      new ValidPostalCode(),
      r => [r.billing_postal_code, r.billing_country],
      'Billing Postal Code'
    );
    this.AddRule(
      new NonEmptyString(),
      r => r.billing_country,
      'Billing Country'
    );
    this.AddRule(new ValidCountry(), r => r.billing_country, 'Billing Country');
    this.AddRule(new NonEmptyString(), r => r.billing_street, 'Billing Street');
    this.AddRule(new NonEmptyString(), r => r.billing_state, 'Billing State');
    this.AddRule(new NonEmptyString(), r => r.billing_city, 'Billing City');

    // Shipping Address
    this.AddRule(
      new NonEmptyString(),
      r => r.shipping_postal_code,
      'Shipping Postal Code'
    );
    this.AddRule(
      new ValidPostalCode(),
      r => [r.shipping_postal_code, r.shipping_country],
      'Shipping Postal Code'
    );
    this.AddRule(
      new NonEmptyString(),
      r => r.shipping_country,
      'Shipping Country'
    );
    this.AddRule(
      new ValidCountry(),
      r => r.shipping_country,
      'Shipping Country'
    );
    this.AddRule(
      new NonEmptyString(),
      r => r.shipping_street,
      'Shipping Street'
    );
    this.AddRule(new NonEmptyString(), r => r.shipping_state, 'Shipping State');
    this.AddRule(new NonEmptyString(), r => r.shipping_city, 'Shipping City');

    // Shipping Type
    this.AddRule(
      new ValidShippingType(),
      r => r.shipping_type,
      'Shipping Type'
    );
  }
}
