
import { ICommand } from '@nestjs/cqrs';

export class ToggleUndoSlotCommand implements ICommand {
  constructor(
    public readonly slotId: number
  ) {}
}