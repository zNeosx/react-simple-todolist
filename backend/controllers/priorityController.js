import { PriorityModel } from "../models/PriorityModel.js";

const priorityInitialState = [
  {
    name: "High",
    color: "#E42C5F",
  },
  {
    name: "Medium",
    color: "#ECB800",
  },
  {
    name: "Low",
    color: "#2D41A7",
  },
];
export const priorityController = {
  init: async (_, res) => {
    try {
      priorityInitialState.forEach(async (priority) => {
        const priorityState = new PriorityModel(priority);
        await priorityState.save();
      });
      res.status(200).json({ message: "Collection Priority Initialisé" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  },
  getAll: async (_, res) => {
    try {
      const priorities = await PriorityModel.find();
      res.status(200).json(priorities);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};
