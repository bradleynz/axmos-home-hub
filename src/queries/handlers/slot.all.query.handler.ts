import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SlotRepository } from '../../repositories/slot.repository';
import { AllSlotQuery } from '../slot.all.query';
import { Logger } from '@nestjs/common/services/logger.service';

@QueryHandler(AllSlotQuery)
export class AllSlotQueryHandler implements IQueryHandler<AllSlotQuery> {
  private readonly logger = new Logger(AllSlotQueryHandler.name);

  constructor(private readonly repository: SlotRepository) {}

  /**
   * Executes the AllSlotQuery to retrieve all slots.
   * @returns An array of all slots.
   */
  async execute() {
    this.logger.log("Exec all command");
    return this.repository.all();
  }
}
