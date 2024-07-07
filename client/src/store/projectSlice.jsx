import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [
    { name: 'Finance', plan: 'Free Plan', env: 'No Production Environment', updated: '4 hours ago' },
    { name: 'chatpdf', plan: 'Free Plan', env: 'No Production Environment', updated: '6 months ago' },
  ],
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex(project => project.name === action.payload.name);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
  },
});

export const { addProject, updateProject } = projectSlice.actions;
export default projectSlice.reducer;
