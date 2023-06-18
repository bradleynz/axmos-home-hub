import { Injectable } from '@nestjs/common';
import { Datastore } from '../store/datastore';
import { SupportedDeviceEnum } from '../enums/supported-device.enum';

@Injectable()
export class SlotRepository {
    all() {
        return Datastore.all();
    }
    get(slotId: number) {
        return Datastore.get(slotId);
    }
    add() {
        Datastore.addSlot();
    }
    assign(slotId: number, supported_device: SupportedDeviceEnum) {
        return Datastore.assign(slotId, supported_device);
    }
    toggle(slotId: number, option: boolean) {
        return Datastore.toggle(slotId, option);
    }
    undo(slotId: number) {
        return Datastore.undo(slotId);
    }
}