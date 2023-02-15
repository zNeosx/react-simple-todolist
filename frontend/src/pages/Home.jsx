import React, { useEffect, useState } from "react";
import { useActionData, useLoaderData, useNavigation } from "react-router-dom";
import { todoService } from "../api/todoService";
import TodoFormComponent from "../components/TodoFormComponent";
import TodoCardComponent from "../components/TodoCardComponent";

export async function loader() {
  const todoList = await todoService.getTodoList();
  const priorityList = await todoService.getPrioritiesList();
  return { todos: todoList.data, priorities: priorityList.data };
}

export async function action({ request }) {
  const formData = await request.formData();

  const name = formData.get("todoName");
  const projectName = formData.get("todoProjectName");
  const priority = formData.get("todoPriority");
  const date = formData.get("todoDate");
  const id = formData.get("todoId");

  const action = formData.get("action");

  // add todo via <Form>
  if (action === "add") {
    const response = await todoService
      .addTodo(name, projectName, priority, date)
      .then((res) => {
        return {
          success: {
            message: `La tâche "${res.data.name}" a bien été ajoutée !`,
          },
        };
      })
      .catch((err) => {
        // throw { message: err.response.data.message };
        return { error: { message: err.response.data.message } };
      });

    return response;
  }

  // update todo state via <fetcher.Form>
  if (action === "update") {
    const response = await todoService
      .updateIsDoneState(id)
      .then((res) => {
        return { success: { message: res.message } };
      })
      .catch((err) => {
        // throw { message: err.response.data.message };
        return { error: { message: err.response.data.message } };
      });

    return response;
  }

  // delete todo via <fetcher.Form>
  if (action === "delete") {
    const response = await todoService
      .deleteOne(id)
      .then((res) => {
        return { success: { message: res.message } };
      })
      .catch((err) => {
        // throw { message: err.response.data.message };
        return { error: { message: err.response.data.message } };
      });

    return response;
  }

  return response;
}

const Home = () => {
  const date = new Date();
  const [defaultDate, setDefaultDate] = useState("");

  const { todos, priorities } = useLoaderData();

  let todosDone = todos.filter((todo) => todo.isDone);

  useEffect(() => {
    if (date.getMonth() + 1 < 10) {
      setDefaultDate(
        `${date.getFullYear().toString()}-0${(
          date.getMonth() + 1
        ).toString()}-${date.getDate().toString()}`
      );
    } else {
      setDefaultDate(
        `${date.getFullYear().toString()}-${(
          date.getMonth() + 1
        ).toString()}-${date.getDate().toString()}`
      );
    }
  }, []);

  return (
    <div className="">
      {/* ---------- date input ---------- */}
      <div className="text-center w-max bg-purpleLight my-4 rounded-xl p-4 mx-auto">
        <div className="mb-4">
          <label
            className="block text-black text-sm font-bold mb-2"
            htmlFor="todoProjectName"
          >
            Date
          </label>
          <input
            type="date"
            className="w-full rounded-xl border py-2 px-3 focus:outline-1 focus:outline-primary"
            name="todoDate"
            value={defaultDate}
            onChange={(e) => setDefaultDate(e.target.value)}
          />
        </div>
      </div>
      {/* ---------- ./ date input ---------- */}

      <div className="flex flex-col lg:flex-row gap-6 p-6 w-full lg:w-max lg:mx-auto">
        {/* ---------- todo add form ---------- */}
        <TodoFormComponent priorities={priorities} />
        {/* ----------------------------------- */}

        {/* ---------- todo box ---------- */}
        <div className="p-4 bg-purpleLight rounded-xl lg:min-w-[300px] xl:min-w-[350px] max-h-[500px] xl:max-h-[600px]">
          <div className="flex items-center justify-start mb-6">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.1096 6.47981C25.6652 4.90453 24.2174 3.75 22.5 3.75H17.5C15.7826 3.75 14.3348 4.90453 13.8904 6.47981M26.1096 6.47981C26.2011 6.80417 26.25 7.14637 26.25 7.5V7.5C26.25 8.19036 25.6904 8.75 25 8.75H15C14.3096 8.75 13.75 8.19036 13.75 7.5V7.5C13.75 7.14637 13.7989 6.80417 13.8904 6.47981M26.1096 6.47981C27.1865 6.56114 28.2576 6.66379 29.3222 6.78735C31.1565 7.00023 32.5 8.58167 32.5 10.4283V32.5C32.5 34.5711 30.8211 36.25 28.75 36.25H11.25C9.17893 36.25 7.5 34.5711 7.5 32.5V10.4283C7.5 8.58167 8.84347 7.00023 10.6778 6.78735C11.7424 6.66379 12.8135 6.56114 13.8904 6.47981"
                stroke="#2B1887"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h2 className="text-lg font-bold ml-2 text-primary">À faire</h2>
          </div>
          <div className="overflow-auto todo_card_box max-h-[400px] xl:h-[90%]">
            {todos.filter((todo) => todo.date === defaultDate && !todo.isDone)
              .length > 0 ? (
              todos
                .filter((todo) => todo.date === defaultDate && !todo.isDone)
                .map((todo) => <TodoCardComponent todo={todo} key={todo._id} />)
            ) : (
              <div className="flex items-center justify-center">
                <h3>Aucune tâche pour aujourd'hui</h3>
              </div>
            )}
          </div>
        </div>
        {/* ----------------------------- */}

        {/* ---------- todo's doned box ---------- */}
        <div className="p-4 bg-purpleLight rounded-xl lg:min-w-[300px] xl:min-w-[350px]">
          <div className="flex items-center justify-start mb-6">
            <svg
              width="29"
              height="36"
              viewBox="0 0 29 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.375 1.75H3.875C2.83947 1.75 2 2.58947 2 3.625V32.375C2 33.4105 2.83947 34.25 3.875 34.25H25.125C26.1605 34.25 27 33.4105 27 32.375V17.375M11.375 1.75H12C20.2843 1.75 27 8.46573 27 16.75V17.375M11.375 1.75C14.4816 1.75 17 4.2684 17 7.375V9.875C17 10.9105 17.8395 11.75 18.875 11.75H21.375C24.4816 11.75 27 14.2684 27 17.375M9.5 23L13.25 26.75L19.5 18"
                stroke="#2B1887"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h2 className="ml-2 text-lg font-bold text-primary">Fini</h2>
          </div>
          <div className="overflow-auto todo_card_box xl:h-[90%]">
            {todosDone.filter((todo) => todo.date === defaultDate).length >
            0 ? (
              todosDone
                .filter((todo) => todo.date === defaultDate)
                .map((todo) => <TodoCardComponent todo={todo} key={todo._id} />)
            ) : (
              <div className="flex items-center justify-center">
                <h3>Aucune tâche effectuées pour aujourd'hui</h3>
              </div>
            )}
          </div>
        </div>
        {/* --------------------------------- */}
      </div>
    </div>
  );
};

export default Home;
