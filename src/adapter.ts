import Ajv, { JSONSchemaType } from "ajv"
import { JTDDataType } from "ajv/dist/jtd"
const ajv = new Ajv()

import attendanceEventSchema from "./spec/attendance.schema.json";
import preAdapterInputSchema from "./spec/pre-adapter.schema.json";

type AttendanceData = JTDDataType<typeof attendanceEventSchema>;
type PreAdapterInput = JTDDataType<typeof preAdapterInputSchema>;

export const adapter = (schemaPreAdapter: JSONSchemaType<PreAdapterInput>, schemaEvent: JSONSchemaType<AttendanceData>, preAdapterInputEvent: PreAdapterInput): AttendanceData => {
    const validatePreAdapter = ajv.compile(schemaPreAdapter);
    const isValidPreAdapterEvent = validatePreAdapter(preAdapterInputEvent);
    if (!isValidPreAdapterEvent) {
        throw new Error("Invalid pre-adapter event");
    } else {
        // convert pre-adapter event to event
        let event: AttendanceData = {
            "schoolId": preAdapterInputEvent.schoolId,
            "isPresent": preAdapterInputEvent.isPresent,
            "grade": preAdapterInputEvent.grade,
            "sectionInGrade": preAdapterInputEvent.section
        };
        const validateEvent = ajv.compile(schemaEvent);
        const isValidEvent = validateEvent(event);
        if (!isValidEvent) {
            throw new Error("Invalid event");
        }
        return event;
    }
};