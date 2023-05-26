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
      if (!state.userInput || state.userInput.trim() === "") return;
      const newTodo = {
        id: uniqueId(),
        content: state.userInput,
        completed: false,
      }; 
      Swal.fire({
        icon: "success",
        title: "Your todo has been saved",
        showConfirmButton: false,
        timer: 1700,
      });
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
      const { id, content } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      console.log(id)
      if (todo) {
        Swal.fire({
          icon: "success",
          title: "Your todo has been updated",
          showConfirmButton: false,
          timer: 1700,
        });
        todo.content = content;
      }
    },
  },
});

export const actions = todosSlice.actions;

export default todosSlice.reducer;
