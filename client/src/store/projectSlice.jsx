import { createSlice } from '@reduxjs/toolkit';
import tinycolor from 'tinycolor2';

const generateGradientColors = (baseColor, count) => {
  const color = tinycolor(baseColor);
  const lightColors = [];
  const darkColors = [];
  const step = 20 / (count / 2);
  for (let i = 1; i <= count / 2; i++) {
    lightColors.push(color.clone().lighten(step * i).toHexString());
    darkColors.push(color.clone().darken(step * i).toHexString());
  }
  return [...lightColors.reverse(), ...darkColors];
};

const initialColors = {
  Primary: [{ label: 'Primary', value: '#009FF5' }, ...generateGradientColors('#009FF5', 10).map((shade, i) => ({
    label: `Primary${i + 1}`,
    value: shade,
  }))],
  Secondary: [{ label: 'Secondary', value: '#AAB9C5' }, ...generateGradientColors('#AAB9C5', 10).map((shade, i) => ({
    label: `Secondary${i + 1}`,
    value: shade,
  }))],
};

const initialState = {
  currentProjectName: 'Project1',
  projects: [
    {
      name: 'Project1',
      colors: initialColors,
      plan: 'Free Plan',
      env: 'No Production Environment',
      updated: 'just now'
    },
  ],
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    updateProject: (state, action) => {
      const index = state.projects.findIndex(p => p.name === action.payload.name);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    addProject: (state, action) => {
      state.projects.push({
        ...action.payload,
        colors: initialColors,
      });
      state.currentProjectName = action.payload.name;
    },
    updateColors: (state, action) => {
      const { projectName, colors } = action.payload;
      const project = state.projects.find(p => p.name === projectName);
      if (project) {
        project.colors = colors;
      }
    },
    setCurrentProject: (state, action) => {
      state.currentProjectName = action.payload;
    },
  },
});

export const { updateProject, addProject, updateColors, setCurrentProject } = projectSlice.actions;
export default projectSlice.reducer;
