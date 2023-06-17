import { IQuery } from '@nestjs/cqrs';

export class GetSlotQuery implements IQuery {
  constructor(
    public readonly slotId: number,
  ) {}
}