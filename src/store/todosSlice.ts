import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoListResponce } from '../types/todosModel';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TodosState {
  todoLists: TodoListResponce[];
  loading: boolean
}

const initialState: TodosState = {
  todoLists: [],
  loading: false
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {

    fetchTodosStart(state) {
        state.loading = true;
    },
    fetchTodosSuccess(state, action: PayloadAction<TodoListResponce[]>) {
        state.loading = false;
        state.todoLists = action.payload;
    },

    // addTodoList(state, action: PayloadAction<{ id: string; name: string }>) {
    //   state.todoLists.push({
    //     id: action.payload.id,
    //     name: action.payload.name,
    //     tasks: [],
    //   });
    // },

    deleteTodoList(state, action: PayloadAction<string>) {
      state.todoLists = state.todoLists.filter((list) => list.id !== action.payload);
    },

    addTask(state, action: PayloadAction<{ listId: string; task: Task }>) {
      const list = state.todoLists.find((list) => list.id === action.payload.listId);
      if (list) {
        list.tasks.push(action.payload.task);
      }
    },

    updateTask(
      state,
      action: PayloadAction<{ listId: string; taskId: string; updatedTask: Partial<Task> }>
    ) {
      const list = state.todoLists.find((list) => list.id === action.payload.listId);
      if (list) {
        const task = list.tasks.find((task) => task.id === action.payload.taskId);
        if (task) {
          Object.assign(task, action.payload.updatedTask);
        }
      }
    },

    deleteTask(state, action: PayloadAction<{ listId: string; taskId: string }>) {
      const list = state.todoLists.find((list) => list.id === action.payload.listId);
      if (list) {
        list.tasks = list.tasks.filter((task) => task.id !== action.payload.taskId);
      }
    },
  },
});

export const { fetchTodosStart, fetchTodosSuccess, deleteTodoList, addTask, updateTask, deleteTask } = todosSlice.actions;

export default todosSlice.reducer;
