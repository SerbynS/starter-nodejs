import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();
// router.use(responseMiddleware);

// TODO: Implement route controllers for user

// GET /api/users
router.get(
  "/",
  (req, res, next) => {
    console.log("GET users");
    try {
      const users = userService.getAll();
      res.data = users;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// GET /api/users/:id
router.get(
  "/:id",
  (req, res, next) => {
    console.log("GET user");
    try {
      const user = userService.getUser(req.params.id);
      res.data = user;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// POST /api/users
router.post(
  "/",
  createUserValid,
  (req, res, next) => {
    console.log("POST user");
    try {
      const newUser = userService.createUser(req.body);
      res.data = newUser;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// // PATCH /api/users/:id
router.patch(
  "/:id",
  updateUserValid,
  (req, res, next) => {
    console.log("Patch users");
    try {
      const updateUser = userService.updateUser(req.params.id, req.body);
      res.data = updateUser;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// DELETE /api/users/:id
router.delete(
  "/:id",
  (req, res, next) => {
    console.log("DELETE user");
    try {
      const deleteUser = userService.deleteUser(req.params.id);
      res.data = deleteUser;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
