import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    setTasks: (state, action) => action.payload,
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task._id !== action.payload);
    },
    updateTask: (state, action) => {
      const updatedTask = action.payload;
      const index = state.findIndex((task) => task._id === updatedTask._id);
      if (index !== -1) {
        state[index] = updatedTask;
      }
    },
  },
});

export const { setTasks, addTask, deleteTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;
