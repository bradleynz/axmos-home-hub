import { AddSlotCommandHandler } from './slot.add.command.handler';
import { AssignSlotCommandHandler } from './slot.assign.command.handler';
import { ToggleSlotCommandHandler } from './slot.toggle.command.handler';
import { ToggleUndoSlotCommandHandler } from './slot.toggle.undo.command.handler';
export const CommandHandlers = [AssignSlotCommandHandler, ToggleSlotCommandHandler, 
    ToggleUndoSlotCommandHandler, AddSlotCommandHandler];