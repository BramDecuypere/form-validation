import { validate } from "./form-validator";
import { ValidationError } from "joi";

describe("form-validator", () => {
  it("should be testable", () => {
    expect(true).toBe(true);
  });

  describe("firstName", () => {
    it("should throw an error if the passed value is not a string", () => {
      const result = validate({ firstName: 5 });

      expect(result.error?.details[0].type).toBe("string.base");
    });
  });
});
