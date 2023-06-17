import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers/index';
import { SlotController } from './controllers/slot.controller';
import { SlotRepository } from './repositories/slot.repository';
import { Datastore } from './store/datastore';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [CqrsModule, Datastore],
  controllers: [SlotController],
  providers: [
    SlotRepository,
    ...CommandHandlers,
    ...QueryHandlers
  ],
})
export class SlotModule {}