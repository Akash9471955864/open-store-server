import {IGetShippingCostValidator} from './IGetShippingCostValidator';
import {ValidShippingType} from '../rules/ValidShippingType';
import {Request} from '../../interactor/GetShippingCost';
import {ValidPostalCode} from '../rules/ValidPostalCode';
import {NonEmptyString} from '../rules/NonEmptyString';
import {ValidCountry} from '../rules/ValidCountry';
import {GreaterThan} from '../rules/GreaterThan';
import {NoDuplicate} from '../rules/NoDuplicate';
import {ValidID} from '../rules/ValidID';
import {Validator} from '../Validator';
import {injectable} from 'inversify';
import {All} from '../rules/All';

@injectable()
export class GetShippingCostValidator extends Validator<Request>
  implements IGetShippingCostValidator {
  constructor() {
    super();

    this.AddRule(new NonEmptyString(2), x => x.shipping_street, 'Street');
    this.AddRule(new NonEmptyString(2), x => x.shipping_state, 'State');
    this.AddRule(new NonEmptyString(2), x => x.shipping_city, 'City');

    this.AddRule(new ValidCountry(false), x => x.shipping_country, 'Country');
    this.AddRule(
      new ValidPostalCode(),
      x => [x.shipping_postal_code, x.shipping_country],
      'Postal Code'
    );

    this.AddRule(new GreaterThan(0), r => r.units?.length, 'Number of Units');
    this.AddRule(new NoDuplicate(x => x[0]), r => r.units, 'Unit IDs');
    this.AddRule(All.Apply(new ValidID()), x => x.units, 'Units');

    this.AddRule(
      new ValidShippingType(),
      x => x.shipping_type,
      'Shipping Type'
    );
  }
}
