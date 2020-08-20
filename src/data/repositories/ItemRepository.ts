import {IUnitRepository} from '../../domain/repositories/IUnitRepository/IUnitRepository';
import {IPricingRepository} from '../../domain/repositories/IPricingRepository';
import {IItemRepository} from '../../domain/repositories/IItemRepository';
import {IDataContext} from '../../crosscutting/dataContext/IDataContext';
import {Pricing} from '../../domain/entities/Pricing';
import {TYPES} from '../../crosscutting/di/di_types';
import {Unit} from '../../domain/entities/Unit/Unit';
import {Item} from '../../domain/entities/Item';
import {injectable, inject} from 'inversify';
import {QueryResult} from 'pg';

@injectable()
export class ItemRepository implements IItemRepository {
  private MapToItem(item: any, price: Pricing, unit: Unit): Item {
    const quantity = Number.parseInt(item.QUANTITY);
    return new Item(quantity, price, unit);
  }

  async RetrieveByOrder(id: string): Promise<Array<Item>> {
    const select = `SELECT * FROM "ITEM"`;
    const where = `WHERE "ORDER" = $1`;

    const query = `${select} ${where}`;
    const values = [id];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to retrieve items');
    }

    const items = new Array<Item>();
    for (const row of result.rows) {
      const price = await this.pricingRepository.Retrieve(row.PRICE);
      if (price === undefined) continue;

      const unit = await this.unitRepository.Retrieve(row.UNIT, price.Currency);
      if (unit === undefined) continue;

      items.push(this.MapToItem(row, price, unit));
    }

    return items;
  }

  async Insert(item: Item, order: string): Promise<void> {
    const pricing_id = await this.pricingRepository.Insert(item.Price);
    const unit_id = item.Unit.ID;

    const _insert = `INSERT INTO "ITEM"`;
    const _params = `("PRICE", "UNIT", "QUANTITY", "ORDER")`;
    const _values = `VALUES ($1, $2, $3, $4)`;

    const query = `${_insert} ${_params} ${_values}`;
    const values = [pricing_id, unit_id, item.Quantity, order];

    let result: QueryResult;

    try {
      result = await this.data.query(query, values);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to insert item');
    }
  }

  constructor(
    @inject(TYPES.IPricingRepository)
    private pricingRepository: IPricingRepository,
    @inject(TYPES.IUnitRepository)
    private unitRepository: IUnitRepository,
    @inject(TYPES.IDataContext) private data: IDataContext
  ) {}
}
