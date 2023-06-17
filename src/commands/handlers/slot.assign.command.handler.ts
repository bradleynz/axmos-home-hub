import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { SlotRepository } from '../../repositories/slot.repository';
import { AssignSlotCommand } from '../slot.assign.command';

@CommandHandler(AssignSlotCommand)
export class AssignSlotCommandHandler implements ICommandHandler<AssignSlotCommand> {
  constructor(
    private readonly repository: SlotRepository
  ) {}

  /**
   * Execute the AssignSlotCommand.
   * @param command The AssignSlotCommand object.
   * @returns The result of the assignment.
   */
  async execute(command: AssignSlotCommand) {
    console.log("Executing AssignSlotCommand");
    const { slotId, supported_device } = command;
    return this.repository.assign(slotId, supported_device);
  }
}
