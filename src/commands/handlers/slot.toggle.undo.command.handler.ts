import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { SlotRepository } from '../../repositories/slot.repository';
import { ToggleUndoSlotCommand } from '../slot.toggle.undo.command';
import { Logger } from '@nestjs/common/services/logger.service';

@CommandHandler(ToggleUndoSlotCommand)
export class ToggleUndoSlotCommandHandler implements ICommandHandler<ToggleUndoSlotCommand> {
  
  private readonly logger = new Logger(ToggleUndoSlotCommandHandler.name);

  constructor(
    private readonly repository: SlotRepository
  ) {}

  /**
   * Execute the ToggleUndoSlotCommand.
   * @param command The ToggleUndoSlotCommand object.
   * @returns The result of the toggle operation.
   */
  async execute(command: ToggleUndoSlotCommand) {
    this.logger.log("Executing ToggleSlotCommand");
    const { slotId } = command;
    return this.repository.undo(slotId);
  }
}
