import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSlotQuery } from '../slot.get.query';
import { SlotRepository } from '../../repositories/slot.repository';
import { Logger } from '@nestjs/common/services/logger.service';

@QueryHandler(GetSlotQuery)
export class GetSlotQueryHandler implements IQueryHandler<GetSlotQuery> {
  
  private readonly logger = new Logger(GetSlotQueryHandler.name);

  constructor(private readonly repository: SlotRepository) {}

  /**
   * Executes the GetSlotQuery to retrieve a specific slot.
   * @param query The GetSlotQuery containing the slot ID.
   * @returns The slot object if found.
   */
  async execute(query: GetSlotQuery) {
    this.logger.log(query);
    return this.repository.get(query.slotId);
  }
}
