// test adapter with sample pre-adapter event
import { adapter } from "../src/index";

const preAdapterInputEvent = {
    "studentId": "123456",
    "section": "A",
    "grade": "1"
};
const event = adapter(schemaPreAdapter, schemaEvent, preAdapterInputEvent);
console.log(event);
// test adapter with invalid pre-adapter event
const preAdapterInputEventInvalid = {
    "studentId": "123456",
    "section": "A",
    "grade": "1",
    "invalid": "invalid"
};
