import {Address} from '../../../src/domain/entities/Address';
import {Country} from '../../../src/domain/entities/Country';
import {Entity} from '../../../src/domain/entities/Entity';

test('Should allow undefined ID on constructor', () => {
  expect(
    () => new Address('AA', Country.ANY, 'AA', 'AA', 'AA')
  ).not.toThrowError();
});

test('Should not allow undefined ID on setter', () => {
  const entity: Entity = new Address('AA', Country.ANY, 'AA', 'AA', 'AA');
  expect(() => (entity.ID = undefined)).toThrowError();
});

test('Should not allow ID re-definition', () => {
  const entity: Entity = new Address('AA', Country.ANY, 'AA', 'AA', 'AA', 'ID');
  expect(() => (entity.ID = 'ID2')).toThrowError();
});

test('Property ID should return the provided ID', () => {
  const entity: Entity = new Address('AA', Country.ANY, 'AA', 'AA', 'AA', 'ID');
  expect(entity.ID).toEqual('ID');
});

test('Property ID should be set to the provided ID', () => {
  const entity: Entity = new Address('AA', Country.ANY, 'AA', 'AA', 'AA');
  entity.ID = 'ID';
  expect(entity.ID).toEqual('ID');
});
