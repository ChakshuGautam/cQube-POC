// test adapter with sample pre-adapter event
import { adapter } from '../src/index';
import preAdapterInputSchema from '../src/spec/pre-adapter.schema.json';
import attendanceEventSchema from '../src/spec/attendance.schema.json';

describe('adapter', () => {
  it('should convert pre-adapter event to event', () => {
    const preAdapterInputEvent = {
      studentId: 'test-student-id',
      schoolId: '123',
      isPresent: true,
      grade: 1,
      section: 'A',
    };
    const event = adapter(
      preAdapterInputSchema,
      attendanceEventSchema,
      preAdapterInputEvent
    );
    expect(event).toEqual({
      schoolId: '123',
      isPresent: true,
      grade: 1,
      sectionInGrade: 'A',
    });
  });
});
