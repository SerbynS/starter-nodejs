import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter

// GET /api/fighters
router.get(
  "/",
  (req, res, next) => {
    console.log("GET fighters");
    try {
      const fighters = fighterService.getAllFighters();
      res.data = fighters;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// GET /api/fighters/:id
router.get(
  "/:id",
  (req, res, next) => {
    console.log("GET fighter");
    try {
      const fighter = fighterService.getFighter(req.params.id);
      res.data = fighter;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// POST /api/fighters
router.post(
  "/",
  createFighterValid,
  (req, res, next) => {
    console.log("POST fighters");
    try {
      const fighter = fighterService.createFighter(req.body);
      res.data = fighter;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// PATCH /api/fighters/:id
router.patch(
  "/:id",
  updateFighterValid,
  (req, res, next) => {
    console.log("PATCH fighter");
    try {
      const fighter = fighterService.updateFighter(req.params.id, req.body);
      res.data = fighter;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// DELETE /api/fighters/:id
router.delete(
  "/:id",
  (req, res, next) => {
    console.log("DELETE fighter");
    try {
      const fighter = fighterService.deleteFighter(req.params.id);
      res.data = fighter;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
