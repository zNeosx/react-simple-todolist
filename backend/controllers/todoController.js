import { TodoModel } from "../models/TodoModel.js";

export const todoController = {
  getAll: async (_, res) => {
    try {
      const todos = await TodoModel.find()
        .sort({ createdAt: -1 })
        .populate("priority");
      res.status(200).json(todos);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  getOneById: async (req, res) => {
    try {
      const todo = await TodoModel.findById(req.params.id);
      res.status(200).json(todo);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  addOne: async (req, res) => {
    try {
      const todo = new TodoModel({
        name: req.body.name,
        projectName: req.body.projectName,
        priority: req.body.priority,
        date: req.body.date,
      });
      await todo.save();
      res.status(200).json(todo);
    } catch (error) {
      let errMessage = [];
      const propertiesName = Object.keys(error.errors);
      propertiesName.forEach((propertieName) => {
        errMessage.push(error.errors[propertieName].properties.message);
        return true;
      });
      res.status(400).json({
        message: errMessage[0],
      });
    }
  },
  deleteOneById: async (req, res) => {
    try {
      const todoNameToDelete = await TodoModel.findById(req.params.id, {
        name: 1,
      });
      await TodoModel.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: `La tâche : "${todoNameToDelete}" a bien été supprimée !`,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error.message,
      });
    }
  },
  updateIsDoneState: async (req, res) => {
    try {
      await TodoModel.findByIdAndUpdate(req.params.id, [
        { $set: { isDone: { $not: "$isDone" } } },
      ]);
      res.status(200).json({ message: "Status isDone updated !" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  updateTodo: async (req, res) => {
    try {
      await TodoModel.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
      });
      res.status(200).json({ message: "La tâche a bien été modifiée !" });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};
