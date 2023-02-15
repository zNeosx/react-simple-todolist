import mongoose from "mongoose";

const PrioritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Le nom de la priorité est attendu."],
  },
  color: {
    type: String,
    required: [true, "La couleur de la priorité est attendu."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const PriorityModel = mongoose.model("Priority", PrioritySchema);
