import { ErrorTypes } from "enums/error-types";



export interface CustomError {
    message: string; // Developer readable string
    type: ErrorTypes; // Predefined error codes - "VALIDATION_ERROR"
    code?: string;
    path?: string; // Path to the property
    trace_id?: string; // identifier of logs if necessary
  }