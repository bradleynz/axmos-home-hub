import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { SlotRepository } from '../../repositories/slot.repository';
import { Logger } from '@nestjs/common/services/logger.service';
import { AddSlotCommand } from '../slot.add.command';

@CommandHandler(AddSlotCommand)
export class AddSlotCommandHandler implements ICommandHandler<AddSlotCommand> {
  
  private readonly logger = new Logger(AddSlotCommandHandler.name);
  
  constructor(
    private readonly repository: SlotRepository
  ) {}

  /**
   * Execute the AddSlotCommand.
   * @param command The AddSlotCommand object.
   * @returns The result of the additional slot.
   */
  async execute(command: AddSlotCommand) {
    this.logger.log("Executing AddSlotCommand");
    return this.repository.add();
  }
}
