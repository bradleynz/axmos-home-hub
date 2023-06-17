import { SlotDto } from "../dtos/slot.dto";
import { SupportedDeviceEnum } from "../enums/supported-device.enum";
import { Slot } from "../models/slot.model";

/**
 * Datastore class for managing slots.
 */
export class Datastore {
    private static slots: Slot[] = [];
    private static supported_device_mapping = [
        { device: SupportedDeviceEnum.Dishwasher, text: "on/off" },
        { device: SupportedDeviceEnum.GarageDoor, text: "open/close" },
        { device: SupportedDeviceEnum.LivingRoomLights, text: "on/off" }
    ]
    /**
     * Assign a supported device to a slot.
     * @param slotId The ID of the slot to assign.
     * @param supportedDevice The supported device to assign.
     * @returns The updated slot if found, undefined otherwise.
     */
    public static assign(slotId: number, supportedDevice: SupportedDeviceEnum): Slot | undefined {
        const assignSlot = this.slots.find(slot => slot.slotId == slotId);

        if (assignSlot) {
            assignSlot.last_toggled_slot = {
                slotId: assignSlot.slotId,
                option: assignSlot.option,
                optionValue: assignSlot.option_value,
                supported_device: assignSlot.supported_device
            }
            let mapping = this.supported_device_mapping.find(mapping => mapping.device == supportedDevice);
            if(mapping){
                assignSlot.option_text = mapping.text;
            }
            assignSlot.supported_device = supportedDevice;
        }

        return assignSlot;
    }

    /**
     * Undo the last toggled option of a slot.
     * @param slotId The ID of the slot to undo.
     * @returns The updated slot if found, undefined otherwise.
     */
    public static undo(slotId: number): Slot | undefined {
        const toggledSlot = this.slots.find(slot => slot.slotId == slotId);

        if (toggledSlot) {
            toggledSlot.option = toggledSlot.last_toggled_slot.option;
            toggledSlot.option_value = toggledSlot.last_toggled_slot.option_value;
            toggledSlot.supported_device = toggledSlot.last_toggled_slot.supported_device;
        }

        return toggledSlot;
    }

    /**
     * Toggle the option of a slot.
     * @param slotId The ID of the slot to toggle.
     * @param option The option value to set.
     * @returns The updated slot if found, undefined otherwise.
     */
    public static toggle(slotId: number, option: boolean): Slot | undefined {
        const toggledSlot = this.slots.find(slot => slot.slotId == slotId);

        if (toggledSlot) {
            toggledSlot.last_toggled_slot = {
                slotId: toggledSlot.slotId,
                option: toggledSlot.option,
                optionValue: toggledSlot.option_value,
                supported_device: toggledSlot.supported_device
            }
            toggledSlot.option = option;
            toggledSlot.option_value = this.getOptionValue(option, toggledSlot);
        }

        return toggledSlot;
    }

    /**
     * Get all slots.
     * @returns An array of all slots.
     */
    public static all(): Slot[] {
        return this.slots;
    }

    /**
     * Get a specific slot by ID.
     * @param id The ID of the slot to retrieve.
     * @returns The slot if found, undefined otherwise.
     */
    public static get(id: number): Slot | undefined {
        return this.slots.find(slot => slot.slotId == id);
    }

    /**
     * Seed the datastore with initial slot data.
     */
    public static seed(): void {
        const dishwasher = new SlotDto(1, "on/off", false, SupportedDeviceEnum.Dishwasher);
        const garageDoor = new SlotDto(2, "open/close", true, SupportedDeviceEnum.GarageDoor);
        const emptySlot = new SlotDto(3, null, false, null);

        this.add(dishwasher);
        this.add(garageDoor);
        this.add(emptySlot);

        console.log("Simulating assign toggle undo process");
        // Simulate the assign/toggle/undo
        this.assign(3, SupportedDeviceEnum.LivingRoomLights);
        this.toggle(3, true);
        const slot = this.get(3);

        console.log(slot.option, slot.option_text);
        this.undo(3);

        this.assign(3, null);
        this.toggle(3, false);
        this.undo(3);

        console.log(this.slots);
    }

    private static getOptionValue(option: boolean, toggledSlot: Slot): string {
        const optionText = toggledSlot.option_text.toLowerCase();
        const on = optionText.includes("on");
        const off = optionText.includes("off");
        const open = optionText.includes("open");
        const closed = optionText.includes("close");
      
        if (option) {
          if (on) {
            return "ON";
          } else if (open) {
            return "OPEN";
          }
        } else {
          if (off) {
            return "OFF";
          } else if (closed) {
            return "CLOSED";
          }
        }
      
        return "";
    }      

    private static add(slotDto: SlotDto): void {
        const slot = new Slot();
        slot.set(slotDto);
        this.slots.push(slot);
    }
}
