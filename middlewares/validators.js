const { sendResponse } = require("../helpers/utils");
const { validationResult,  } = require("express-validator");
const mongoose = require("mongoose");
const validators = {};

validators.validate = (validationArray) => async (req, res, next) => {
  await Promise.all(validationArray.map((validation) => validation.run(req)));
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  const message = errors
    .array()
    .map((error) => error.msg)
    .join("&");
  return sendResponse(res, 422, false, null, { message }, "validation error");
};

validators.checkObjectId = (paramId) => {
  if (!mongoose.Types.ObjectId.isValid(paramId)) {
    throw new Error("Invalid Id");
  }
  return true;
};
module.exports = validators;
