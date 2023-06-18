import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AssignSlotCommand } from '../commands/slot.assign.command';
import { ToggleSlotCommand } from '../commands/slot.toggle.command';
import { SupportedDeviceEnum } from '../enums/supported-device.enum';
import { Slot } from '../models/slot.model';
import { AllSlotQuery } from '../queries/slot.all.query';
import { GetSlotQuery } from '../queries/slot.get.query';
import { ToggleUndoSlotCommand } from '../commands/slot.toggle.undo.command';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AddSlotCommand } from '../commands/slot.add.command';

@ApiTags('slots')
@Controller('slots')
export class SlotController {
  
  private readonly logger = new Logger(SlotController.name);
  
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * Get a specific slot by ID.
   * @param id The ID of the slot to retrieve.
   * @returns The slot object if found.
   * @throws NotFoundException if the slot is not found.
   */
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Slot> {

    this.logger.log("Executing get " + id);
    const slot = await this.queryBus.execute(new GetSlotQuery(id));

    if (!slot) {
      this.logger.log("throw not found.");
      throw new NotFoundException();
    }

    return slot;
  }

  /**
   * Get all slots.
   * @returns An array of all slots.
   */
  @Get()
  async all(): Promise<Slot[]> {
    this.logger.log("Executing all fetch");
    return this.queryBus.execute(new AllSlotQuery());
  }

  /**
   * Send a command to add a slot.
   * @body slotDto
   */
  @Post('add')
  async add() {
    await this.commandBus.execute(new AddSlotCommand());
  }

  /**
   * Send a command to assign a supported device to a slot.
   * @param id The ID of the slot to assign.
   * @param supportedDevice The supported device to assign.
   * @throws BadRequestException if the supported device is invalid.
   */
  @ApiBody({description: "supportedDevice:SupportedDeviceEnum assign"})
  @Put(':id/assign')
  async assign(
    @Param('id', ParseIntPipe) id: number,
    @Body('supported_device') supportedDevice: SupportedDeviceEnum,
  ) {
    this.logger.log("Executing assign " + id, " supported device: " + supportedDevice);

    if (!Object.values(SupportedDeviceEnum).includes(supportedDevice)) {
      this.logger.log("throw supported device invalid.");
      throw new BadRequestException('Invalid supported device.');
    }

    await this.commandBus.execute(new AssignSlotCommand(id, supportedDevice));
  }

  /**
   * Send a command to toggle the option of a slot.
   * @param id The ID of the slot to toggle.
   * @param option The option value to set.
   * @throws BadRequestException if the option value is invalid.
   */
  @ApiBody({description: "option:boolean toggle"})
  @Put(':id/toggle')
  async toggle(
    @Param('id', ParseIntPipe) id: number,
    @Body('option') option: boolean,
  ) {
    if (typeof option !== 'boolean') {
      throw new BadRequestException('Invalid option value.');
    }
    this.logger.log("Executing toggle " + id + " option: " + option);

    //Fetch slot and validate the supported device is linked
    const slot = await this.queryBus.execute(new GetSlotQuery(id));

    if(slot && slot.supported_device == undefined){
      this.logger.log("throw supported device missing.");
      throw new BadRequestException('Must assign supported device before toggling.');
    }

    await this.commandBus.execute(new ToggleSlotCommand(id, option));
  }

  /**
   * Send a command to undo toggle the option of a slot.
   * @param id The ID of the slot to toggle.
   * @param option The option value to set.
   * @throws BadRequestException if the option value is invalid.
   */
  @Put(':id/undo')
  async undo(
    @Param('id', ParseIntPipe) id: number
  ) {
    this.logger.log("undo exec");
    await this.commandBus.execute(new ToggleUndoSlotCommand(id));
  }
}
