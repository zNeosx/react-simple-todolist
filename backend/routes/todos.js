import express from "express";
import { todoController } from "../controllers/todoController.js";

const router = express.Router();

router.get("/getAll", todoController.getAll);
router.get("/getOneById/:id", todoController.getOneById);
router.post("/addOne", todoController.addOne);
router.delete("/deleteOneById/:id", todoController.deleteOneById);
router.put("/updateIsDoneState/:id", todoController.updateIsDoneState);
router.put("/updateTodo/:id", todoController.updateTodo);

export default router;
