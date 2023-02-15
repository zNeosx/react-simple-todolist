import { Axios } from "../config/index";

export const todoService = {
  getTodoList: () => {
    return Axios.get("todos/getAll");
  },
  getPrioritiesList: () => {
    return Axios.get("priorities/getAll");
  },
  addTodo: (name, projectName, priority, date) => {
    return Axios.post("todos/addOne", { name, projectName, priority, date });
  },
  deleteOne: (todoId) => {
    return Axios.delete(`todos/deleteOneById/${todoId}`);
  },
  updateIsDoneState: (todoId) => {
    return Axios.put(`todos/updateIsDoneState/${todoId}`);
  },
};
