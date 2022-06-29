import { ValidationErrorItem } from "joi";
import { errorMapper } from "./error-mapper";

describe("errorMapper", () => {
  it("should return an empty array when no error is passed", () => {
    const res = errorMapper();

    expect(res).toEqual([]);
  });

  it("should map to the right structure", () => {
    const sut: ValidationErrorItem[] = [
      {
        context: {
          key: "firstName",
          label: "firstName",
          value: 5,
        },
        message: '"firstName" must be a string',
        path: ["firstName"],
        type: "string.base",
      },
    ];

    const res = errorMapper(sut);

    expect(res).toEqual([
      {
        code: "string.base",
        message: '"firstName" must be a string',
        path: "firstName",
        type: "VALIDATION_ERROR",
      },
    ]);
  });
});
