import { ICommand } from '@nestjs/cqrs';
import { SupportedDeviceEnum } from 'src/enums/supported-device.enum';

export class AssignSlotCommand implements ICommand {
  constructor(
    public readonly slotId: number,
    public readonly supported_device: SupportedDeviceEnum
  ) {}
}
