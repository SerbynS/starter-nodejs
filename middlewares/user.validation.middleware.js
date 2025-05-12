import { USER } from "../models/user.js";

const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);

const validatePhone = (phone) => /^\+380\d{9}$/.test(phone);

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation

  const { firstName, lastName, email, phone, password } = req.body;

  if ("id" in req.body) {
    return res
      .status(400)
      .json({ error: true, message: "ID should not be provided" });
  }

  if (!firstName || !lastName || !email || !phone || !password) {
    return res
      .status(400)
      .json({ error: true, message: "All fields are required" });
  }

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof phone !== "string" ||
    typeof password !== "string"
  ) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid field format" });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      error: true,
      message: "Email must be in the format *@gmail.com",
    });
  }

  if (!validatePhone(phone)) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid phone number format" });
  }

  if (password.length < 4) {
    return res.status(400).json({
      error: true,
      message: "Password must be at least 4 characters long",
    });
  }

  const invalidFields = Object.keys(req.body).filter(
    (key) => !Object.keys(USER).includes(key)
  );
  if (invalidFields.length > 0) {
    return res
      .status(400)
      .json({ error: true, message: "Extra fields are not allowed" });
  }

  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update

  const { firstName, lastName, email, phone, password, id } = req.body;

  if ("id" in req.body) {
    return res
      .status(400)
      .json({ error: true, message: "ID should not be provided" });
  }

  const hasAtLeastOneField =
    firstName || lastName || email || phone || password;

  if (!hasAtLeastOneField) {
    return res.status(400).json({
      error: true,
      message: "At least one field must be provided",
    });
  }

  if (
    (firstName && typeof firstName !== "string") ||
    (lastName && typeof lastName !== "string") ||
    (email && typeof email !== "string") ||
    (phone && typeof phone !== "string") ||
    (password && typeof password !== "string")
  ) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid field format" });
  }

  if (email && !validateEmail(email)) {
    return res.status(400).json({
      error: true,
      message: "Email must be in the format *@gmail.com",
    });
  }

  if (phone && !validatePhone(phone)) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid phone number format" });
  }

  if (password && password.length < 4) {
    return res.status(400).json({
      error: true,
      message: "Password must be at least 4 characters long",
    });
  }

  const allowedFields = ["firstName", "lastName", "email", "phone", "password"];
  const invalidFields = Object.keys(req.body).filter(
    (key) => !Object.keys(USER).includes(key)
  );
  console.log(invalidFields);
  if (invalidFields.length > 0) {
    return res
      .status(400)
      .json({ error: true, message: "Extra fields are not allowed" });
  }

  next();
};

export { createUserValid, updateUserValid };
