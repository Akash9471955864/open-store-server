import {Address} from '../entities/Address';

export interface IAddressRepository {
  Insert(address: Address): Promise<string>;
  Retrieve(id: string): Promise<Address | undefined>;
}
