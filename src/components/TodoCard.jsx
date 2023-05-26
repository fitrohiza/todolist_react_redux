/* eslint-disable react/prop-types */
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { actions } from "../features/todos/todosSlice";
import Swal from "sweetalert2";
import { useState } from "react";

const TodoCard = ({ todo }) => {
  const dispatch = useDispatch();
  const [updatedContent, setUpdatedContent] = useState(todo.content);

  const handleToggle = (id) => {
    dispatch(actions.toggleTodo({ id }));
  };

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(actions.deleteTodo({ id }));
        Swal.fire("Deleted!", "Todo has been deleted.", "success");
      }
    });
  };

  const handleUpdate = (id, content) => {
    Swal.fire({
      title: "Update your todo",
      input: "text",
      inputValue: content,
      showCancelButton: true,
      confirmButtonText: "Update",
    }).then((result) => {
      if (result.value) {
        const updateValue = result.value;
        console.log(updateValue);
        dispatch(actions.updateTodo({ id, content: updateValue }));
        setUpdatedContent(updateValue);
      }
    });
  };

  return (
    <>
      {todo.length < 1 ? (
        <p>Empty todo</p>
      ) : (
        <div className="flex justify-between p-3 shadow-lg border-2 border-slate-300 rounded mb-4 items-center max-w-xl mx-auto bg-white">
          <div className="flex gap-3 items-center">
            <input
              type="checkbox"
              name="completed"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
              className="h-5 w-5"
            />
            <p className={`text-lg ${todo.completed ? "line-through" : ""}`}>
              {todo.content || updatedContent}
            </p>
          </div>
          <div className="space-x-3">
            <button
              className="hover:text-blue-600"
              onClick={() => handleUpdate(todo.id, todo.content)}
            >
              <BsPencilFill />
            </button>
            <button
              className="hover:text-red-600"
              onClick={() => handleRemove(todo.id)}
            >
              <BsFillTrashFill />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoCard;
