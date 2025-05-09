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

    if (!users || users.length === 0) {
      return res.status(404).json({
        error: true,
        message: "Users not found",
      });
    }

    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "",
    });
  }
});

// GET /api/users/:id
router.get("/:id", (req, res) => {
  try {
    const user = userService.getUser(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "",
    });
  }
});

export { router };
