import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { SlotRepository } from '../../repositories/slot.repository';
import { ToggleSlotCommand } from '../slot.toggle.command';
import { Logger } from '@nestjs/common/services/logger.service';

@CommandHandler(ToggleSlotCommand)
export class ToggleSlotCommandHandler implements ICommandHandler<ToggleSlotCommand> {
  
  private readonly logger = new Logger(ToggleSlotCommandHandler.name);
  
  constructor(
    private readonly repository: SlotRepository
  ) {}

  /**
   * Execute the ToggleSlotCommand.
   * @param command The ToggleSlotCommand object.
   * @returns The result of the toggle operation.
   */
  async execute(command: ToggleSlotCommand) {
    this.logger.log("Executing ToggleSlotCommand");
    const { slotId, option } = command;
    return this.repository.toggle(slotId, option);
  }
}
