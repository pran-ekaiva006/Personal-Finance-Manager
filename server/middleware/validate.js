/**
 * Zod validation middleware factory.
 * Takes a Zod schema and returns Express middleware that validates req.body.
 * On failure, responds with 400 and the first validation error message.
 */
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const firstError = result.error.issues[0];
    return res.status(400).json({ message: firstError.message });
  }
  req.body = result.data; // use the parsed (and possibly transformed) data
  next();
};

export default validate;
