import { Test, TestingModule } from '@nestjs/testing';
import { SlotController } from './slot.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { GetSlotQuery } from '../queries/slot.get.query';
import { AllSlotQuery } from '../queries/slot.all.query';
import { Slot } from '../models/slot.model';
import { SupportedDeviceEnum } from '../enums/supported-device.enum';
import { SlotDto } from '../dtos/slot.dto';
import { Datastore } from '../store/datastore';
import { ToggleSlotCommand } from '../commands/slot.toggle.command'; // Update the import path
import { AssignSlotCommand } from '../commands/slot.assign.command'; // Update the import path


describe('SlotController', () => {
  let slotController: SlotController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlotController],
      imports: [Datastore],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        }
      ],
    }).compile();

    slotController = module.get<SlotController>(SlotController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  describe('get', () => {
    it('should return the slot when it exists', async () => {
      const slotId = 1;
      const expectedSlot = new Slot();
      expectedSlot.set(new SlotDto(1, "Dishwasher", false, SupportedDeviceEnum.Dishwasher));

      jest.spyOn(queryBus, 'execute').mockResolvedValue(expectedSlot);

      const result = await slotController.get(slotId);

      expect(result).toEqual(expectedSlot);
      expect(queryBus.execute).toHaveBeenCalledWith(new GetSlotQuery(slotId));
    });

    it('should throw NotFoundException when the slot does not exist', async () => {
      const slotId = 1;

      jest.spyOn(queryBus, 'execute').mockResolvedValue(null);

      await expect(slotController.get(slotId)).rejects.toThrowError(NotFoundException);
      expect(queryBus.execute).toHaveBeenCalledWith(new GetSlotQuery(slotId));
    });
  });

  describe('all', () => {
    it('should return an array of all slots', async () => {
      const expectedSlots: Slot[] = [
        // Define the expected slots array
      ];

      jest.spyOn(queryBus, 'execute').mockResolvedValue(expectedSlots);

      const result = await slotController.all();

      expect(result).toEqual(expectedSlots);
      expect(queryBus.execute).toHaveBeenCalledWith(new AllSlotQuery());
    });
  });

  describe('assign', () => {
    it('should execute AssignSlotCommand with valid inputs', async () => {
      const slotId = 1;
      const supportedDevice = SupportedDeviceEnum.Dishwasher;

      jest.spyOn(commandBus, 'execute').mockResolvedValue(undefined);

      await slotController.assign(slotId, supportedDevice);

      expect(commandBus.execute).toHaveBeenCalledWith(new AssignSlotCommand(slotId, supportedDevice));
    });
  });

  describe('toggle', () => {
    it('should execute ToggleSlotCommand with valid inputs', async () => {
      const slotId = 1;
      const option = true;

      jest.spyOn(commandBus, 'execute').mockResolvedValue(undefined);

      await slotController.toggle(slotId, option);

      expect(commandBus.execute).toHaveBeenCalledWith(new ToggleSlotCommand(slotId, option));
    });
  });
});
