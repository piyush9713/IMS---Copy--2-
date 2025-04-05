import { z } from "zod";

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.error("Validation error", 400, error.errors);
  }
};

export default validate;
