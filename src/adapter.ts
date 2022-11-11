import Ajv from 'ajv';
import { JTDDataType } from 'ajv/dist/jtd';
import attendanceEventSchema from './spec/attendance.schema.json';
import preAdapterInputSchema from './spec/pre-adapter.schema.json';
const ajv = new Ajv();

type PreAdapterInput = JTDDataType<typeof preAdapterInputSchema>;
type AttendanceData = JTDDataType<typeof attendanceEventSchema>;

export const adapter = (
  schemaPreAdapter: any,
  schemaEvent: any,
  preAdapterInputEvent: PreAdapterInput
): AttendanceData => {
  const validatePreAdapter = ajv.compile<PreAdapterInput>(schemaPreAdapter);
  const isValidPreAdapterEvent = validatePreAdapter(preAdapterInputEvent);
  if (!isValidPreAdapterEvent) {
    console.error(validatePreAdapter.errors);
    throw new Error('Invalid pre-adapter event');
  } else {
    // convert pre-adapter event to event
    let event: AttendanceData = {
      schoolId: preAdapterInputEvent.schoolId,
      isPresent: preAdapterInputEvent.isPresent,
      grade: preAdapterInputEvent.grade,
      sectionInGrade: preAdapterInputEvent.section,
    };
    const validateEvent = ajv.compile<AttendanceData>(schemaEvent);
    const isValidEvent = validateEvent(event);
    if (!isValidEvent) {
      console.error(validateEvent.errors);
      throw new Error('Invalid event');
    }
    return event;
  }
};
