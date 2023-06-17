import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { SlotRepository } from '../../repositories/slot.repository';
import { ToggleSlotCommand } from '../slot.toggle.command';

@CommandHandler(ToggleSlotCommand)
export class ToggleSlotCommandHandler implements ICommandHandler<ToggleSlotCommand> {
  constructor(
    private readonly repository: SlotRepository
  ) {}

  /**
   * Execute the ToggleSlotCommand.
   * @param command The ToggleSlotCommand object.
   * @returns The result of the toggle operation.
   */
  async execute(command: ToggleSlotCommand) {
    console.log("Executing ToggleSlotCommand");
    const { slotId, option } = command;
    return this.repository.toggle(slotId, option);
  }
}
