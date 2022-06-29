import Joi from "joi";

const schema = Joi.object({
  firstName: Joi.string().alphanum().min(2).max(30).required(),
  lastName: Joi.string().alphanum().min(2).max(50).required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  amountOfJournalPrompts: Joi.number().required(),
  journalDate: Joi.date().required(),
  // Feel free to add messages here to make validation have more sense
  // My ideal would be to also provide the error code itself so the frontend can use multilingual keys to translate these
  // .messages({
  //   "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
  //   "string.empty": `Password cannot be empty`,
  //   "any.required": `Password is required`,
  // }),,
});

export const validate = (obj: any) =>
  schema.validate(obj, { abortEarly: false });
