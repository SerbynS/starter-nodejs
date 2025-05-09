import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user

// GET /api/users
router.get("/", (req, res) => {
  try {
    const users = userService.getAll();
    res.status(200).json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "" });
  }
});

export { router };
