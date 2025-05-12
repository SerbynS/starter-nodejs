import { FIGHTER } from "../models/fighter.js";

const isString = (value) => typeof value === "string" && value.trim() !== "";
const isNumber = (value) => typeof value === "number" && !isNaN(value);

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation

  const { name, power, defense, health } = req.body;

  const allowedFields = Object.keys(FIGHTER).filter((k) => k !== "id");
  const bodyFields = Object.keys(req.body);

  const unknownFields = bodyFields.filter(
    (field) => !allowedFields.includes(field)
  );
  if (unknownFields.length > 0) {
    return res
      .status(400)
      .json(`Unknown field(s): ${unknownFields.join(", ")}`);
  }

  if (!isString(name)) {
    return res
      .status(400)
      .json("Name is required and must be a non-empty string.");
  }

  if (!isNumber(power) || power < 1 || power > 100) {
    return res.status(400).json("Power must be a number between 1 and 10.");
  }

  if (
    defense !== undefined &&
    (!isNumber(defense) || defense < 1 || defense > 10)
  ) {
    return res.status(400).json("Defense must be a number between 1 and 10.");
  }

  if (
    health !== undefined &&
    (!isNumber(health) || health < 80 || health > 120)
  ) {
    return res.status(400).json("Health must be a number between 80 and 120.");
  }

  // Set default values if missing
  req.body.health = health ?? FIGHTER.health;
  req.body.defense = defense ?? FIGHTER.defense;

  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  next();
};

export { createFighterValid, updateFighterValid };
