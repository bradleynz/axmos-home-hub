import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { SupportedDeviceEnum } from '../enums/supported-device.enum';

export class SlotDto {
  constructor(
    slotId: number, // Slot ID
    optionText: string, // Option text
    option: boolean, // Option
    supportedDevice?: SupportedDeviceEnum, // Supported device (optional)
    supportedDeviceValue: string = SupportedDeviceEnum[supportedDevice],
    optionValue?: string, //Option value
  ) {
    this.slotId = slotId;
    this.optionText = optionText;
    this.option = option;
    this.optionValue = optionValue;
    this.supportedDevice = supportedDevice;
    this.supportedDeviceValue = supportedDeviceValue;
  }

  @IsNumber()
  readonly slotId: number; // Slot ID is a number

  @IsString()
  readonly optionText: string; // Option text is a string

  @IsString()
  readonly optionValue?: string; // Option text is a string

  @IsBoolean()
  readonly option: boolean; // Option value is a boolean

  @IsNumber()
  readonly supportedDevice?: SupportedDeviceEnum; // Supported device is an optional number

  @IsString()
  readonly supportedDeviceValue: string //Supported device value
}
