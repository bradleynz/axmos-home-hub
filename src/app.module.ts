import { Module } from '@nestjs/common';
import { SlotModule } from './slot.module';

@Module({
  imports: [SlotModule]
})
export class AppModule {}
