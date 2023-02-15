import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { useFetcher } from "react-router-dom";

const TodoCardComponent = ({ todo }) => {
  const fetcher = useFetcher();
  return (
    <div className="bg-white rounded-md mb-4 p-4">
      <div className="flex items-center justify-between">
        <p className={`${todo.isDone && "line-through"} font-bold text-sm`}>
          {todo.name}
        </p>
        <fetcher.Form method="put">
          <input type="hidden" name="todoId" value={todo._id} />
          <button type="submit" name="action" value="update">
            {todo.isDone ? (
              <AiFillCloseCircle className="text-xl text-red-500 opacity-30 hover:opacity-100 transition duration-300 ease-in-out" />
            ) : (
              <BsFillCheckCircleFill className="text-xl text-green-500 opacity-30 hover:opacity-100 transition duration-300 ease-in-out" />
            )}
          </button>
          <button type="submit" name="action" value="delete">
            <RiDeleteBack2Fill className="ml-2 text-xl text-red-500 opacity-30 hover:opacity-100 transition duration-300 ease-in-out" />
          </button>
        </fetcher.Form>
      </div>
      <div className="flex items-center justify-between mt-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 6H20C22.2091 6 24 7.79086 24 10V14.5714C24 16.465 22.465 18 20.5714 18H12C5.37258 18 0 12.6274 0 6V6Z"
            fill={`${todo.priority.color}`}
          />
        </svg>
        <span className="text-sm font-medium text-primary">
          {todo.projectName}
        </span>
      </div>
    </div>
  );
};

export default TodoCardComponent;
