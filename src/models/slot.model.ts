import { AggregateRoot } from '@nestjs/cqrs';
import { SlotDto } from '../dtos/slot.dto';
import { SupportedDeviceEnum } from '../enums/supported-device.enum';

export class Slot extends AggregateRoot {
  
  slotId: number;
  supported_device?: SupportedDeviceEnum;
  option: boolean;
  last_toggled_slot: any | undefined;
  option_text?: string;
  option_value: string;

  set(data: SlotDto) {
    this.slotId = data.slotId;
    this.supported_device = data.supportedDevice;
    this.option = data.option;
    this.option_text = data.optionText;
    this.option_value = data.optionValue;
  }
}

