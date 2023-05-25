import { createSlice } from "@reduxjs/toolkit";
import { uniqueId } from "lodash";
import Swal from "sweetalert2";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    userInput: "",
  },
  reducers: {
    setUserInput: (state, action) => {
      state.userInput = action.payload.userInput;
    },
    createTodo: (state) => {
      if (state.userInput === "") return;
      Swal.fire({
        icon: "success",
        title: "Your todo has been saved",
        showConfirmButton: false,
        timer: 1700,
      });
      const newTodo = {
        id: uniqueId(),
        content: state.userInput,
        completed: false,
      };

      state.todos.push(newTodo);
      state.userInput = "";
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      todo.completed = !todo.completed;
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },

    updateTodo: (state, action) => {
      const todo = state.todos = state.todos.filter((todo) => todo.id === action.payload.id);
      todo.content = action.payload.content;
    },
  },
});

export const actions = todosSlice.actions;

export default todosSlice.reducer;
