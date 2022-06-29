import { ValidationErrorItem } from "joi";

import { CustomError } from "interfaces/error";

import { ErrorTypes } from "../enums/error-types";

export const errorMapper = (error?: ValidationErrorItem[]): CustomError[] => {
  if (!error || error.length === 0) {
    return [];
  }

  return error.map((value) => {
    return {
      message: value.message,
      type: ErrorTypes.VALIDATION_ERROR,
      code: value.type,
      path: value.path.join("."),
    };
  });
};
