import express from "express";
import { priorityController } from "../controllers/priorityController.js";

const router = express.Router();

router.get("/init", priorityController.init);
router.get("/getAll", priorityController.getAll);

export default router;
