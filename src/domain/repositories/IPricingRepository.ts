import {Pricing} from '../entities/Pricing';

export interface IPricingRepository {
  Retrieve(id: string): Promise<Pricing | undefined>;
  Insert(pricing: Pricing): Promise<string>;
}
