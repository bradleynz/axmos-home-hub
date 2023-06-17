import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { SlotRepository } from '../../repositories/slot.repository';
import { ToggleUndoSlotCommand } from '../slot.toggle.undo.command';

@CommandHandler(ToggleUndoSlotCommand)
export class ToggleUndoSlotCommandHandler implements ICommandHandler<ToggleUndoSlotCommand> {
  constructor(
    private readonly repository: SlotRepository
  ) {}

  /**
   * Execute the ToggleUndoSlotCommand.
   * @param command The ToggleUndoSlotCommand object.
   * @returns The result of the toggle operation.
   */
  async execute(command: ToggleUndoSlotCommand) {
    console.log("Executing ToggleSlotCommand");
    const { slotId } = command;
    return this.repository.undo(slotId);
  }
}
