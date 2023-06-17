import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { SupportedDeviceEnum } from '../enums/supported-device.enum';

export class SlotDto {
  constructor(
    slotId: number, // Slot ID
    optionText: string, // Option text
    option: boolean, // Option value
    supportedDevice?: SupportedDeviceEnum // Supported device (optional)
  ) {
    this.slotId = slotId;
    this.optionText = optionText;
    this.option = option;
    this.supportedDevice = supportedDevice;
  }

  @IsNumber()
  readonly slotId: number; // Slot ID is a number

  @IsString()
  readonly optionText: string; // Option text is a string

  @IsBoolean()
  readonly option: boolean; // Option value is a boolean

  @IsNumber()
  readonly supportedDevice?: SupportedDeviceEnum; // Supported device is an optional number
}
