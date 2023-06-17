
import { ICommand } from '@nestjs/cqrs';

export class ToggleSlotCommand implements ICommand {
  constructor(
    public readonly slotId: number,
    public readonly option: boolean
  ) {}
}