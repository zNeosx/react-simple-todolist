import React, { useEffect, useRef } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { AiOutlineFileAdd } from "react-icons/ai";
import { toast } from "react-toastify";

const TodoFormComponent = ({ priorities }) => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const todoAddForm = useRef(null);

  useEffect(() => {
    if (navigation.state === "idle" && actionData?.success) {
      toast.success(actionData.success.message, {
        position: "top-right",
        autoClose: 2000,
      });
      todoAddForm?.current.reset();
    }
    if (navigation.state === "idle" && actionData?.error) {
      toast.error(actionData.error.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }, [navigation]);

  return (
    <Form
      className="p-4 bg-purpleLight rounded-xl h-max"
      method="post"
      ref={todoAddForm}
    >
      <div className="flex items-center justify-start mb-6">
        <AiOutlineFileAdd className="text-4xl mr-2 text-primary" />
        <h2 className="text-lg font-bold text-primary">Ajouter une tâche</h2>
      </div>
      <div className="mb-4">
        <label
          className="block text-black text-sm font-bold mb-2"
          htmlFor="todoName"
        >
          Nom de la tâche
        </label>
        <input
          className=" w-full rounded-xl border py-2 px-3 focus:outline-1 focus:outline-primary"
          id="todoName"
          type="text"
          name="todoName"
          placeholder="Nom de la tâche"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-black text-sm font-bold mb-2"
          htmlFor="todoProjectName"
        >
          Nom du projet
        </label>
        <input
          className="w-full rounded-xl border py-2 px-3 focus:outline-1 focus:outline-primary"
          id="todoProjectName"
          type="text"
          name="todoProjectName"
          placeholder="Nom du projet"
          required
        />
      </div>
      <div className="mb-4">
        {priorities.map((priority) => (
          <div className="form-check" key={priority._id}>
            <input
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary checked:border-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name="todoPriority"
              id="todoPriority"
              value={priority._id}
              required
            />
            <div className="flex items-center gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 6H20C22.2091 6 24 7.79086 24 10V14.5714C24 16.465 22.465 18 20.5714 18H12C5.37258 18 0 12.6274 0 6V6Z"
                  fill={`${priority.color}`}
                />
              </svg>

              <label
                className="form-check-label inline-block text-black"
                htmlFor="todoPriority"
              >
                {priority.name}
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label
          className="block text-black text-sm font-bold mb-2"
          htmlFor="todoProjectName"
        >
          Date de la tâche
        </label>
        <input
          type="date"
          className="w-full rounded-xl border py-2 px-3 focus:outline-1 focus:outline-primary"
          name="todoDate"
        />
      </div>
      <button
        type="submit"
        name="action"
        value={"add"}
        className="bg-primary bg-opacity-50 hover:bg-opacity-100 hover:text-white w-full py-2 px-3 rounded-xl transition duration-300 ease-in-out"
      >
        Ajouter
      </button>
    </Form>
  );
};

export default TodoFormComponent;
