import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SlotRepository } from '../../repositories/slot.repository';
import { AllSlotQuery } from '../slot.all.query';

@QueryHandler(AllSlotQuery)
export class AllSlotQueryHandler implements IQueryHandler<AllSlotQuery> {
  constructor(private readonly repository: SlotRepository) {}

  /**
   * Executes the AllSlotQuery to retrieve all slots.
   * @returns An array of all slots.
   */
  async execute() {
    return this.repository.all();
  }
}
