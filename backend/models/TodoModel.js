import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    match: [
      /^[a-zA-Z0-9éèàçâäëïîûù'"\s]+$/,
      "Le nom de la tâche ne peut contenir que des chiffres et des lettres.",
    ],
    required: [true, "Veuillez entrer le nom de la tâche."],
  },
  projectName: {
    type: String,
    match: [
      /^[a-zA-Z0-9éèàçâäëïîûù\s]+$/,
      "Le nom du projet de la tâche ne peut contenir que des chiffres et des lettres.",
    ],
    required: [true, "Veuillez entrer le nom du projet de la tâche."],
  },
  priority: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Priority",
    required: [true, "La priorité de la tâche est attendu."],
  },
  // priority: {
  //   type: Number,
  //   enum: {
  //     values: [1, 2, 3],
  //     message:
  //       "La valeur donné pour la priorité de la tâche ne correspond pas.",
  //   },
  //   required: [true, "Une priorité à la tâche est nécessaire."],
  // },
  isDone: {
    type: Boolean,
    default: false,
  },
  // day: {
  //   type: String,
  //   enum: {
  //     values: [
  //       "lundi",
  //       "mardi",
  //       "mercredi",
  //       "jeudi",
  //       "vendredi",
  //       "samedi",
  //       "dimanche",
  //     ],
  //     message: "La valeur donné pour le jour de la tâche ne correspond pas.",
  //   },
  // },
  date: {
    type: String,
    required: [true, "La date de la tâche est nécessaire."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const TodoModel = mongoose.model("Todo", TodoSchema);
