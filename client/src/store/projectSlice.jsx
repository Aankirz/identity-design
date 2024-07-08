import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
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

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('projects');
    if (serializedState === null) {
      return [];
    }
    const state = JSON.parse(serializedState);
    return Array.isArray(state) ? state : [];
  } catch (err) {
    return [];
  }
};

const initialState = {
  projects: loadState(),
  currentProjectName: 'Project1',
  error: null,
  loading: false,
};

export const saveProject = createAsyncThunk('projects/saveProject', async (project) => {
  const response = await axios.post('https://identity-design.onrender.com/api/projects/save', project); // Ensure correct URL
  return response.data;
});

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.projects);
    localStorage.setItem('projects', serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setCurrentProject: (state, action) => {
      state.currentProjectName = action.payload;
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex(p => p.name === action.payload.name);
      if (index !== -1) {
        state.projects[index] = action.payload;
        saveState(state);
      }
    },
    addProject: (state, action) => {
      state.projects.push({
        ...action.payload,
        colors: initialColors,
      });
      state.currentProjectName = action.payload.name;
      saveState(state);
    },
    updateColors: (state, action) => {
      const { projectName, colors } = action.payload;
      const project = state.projects.find(p => p.name === projectName);
      if (project) {
        project.colors = colors;
        saveState(state);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.projects.findIndex(p => p.name === action.payload.name);
        if (index !== -1) {
          state.projects[index] = action.payload;
        } else {
          state.projects.push(action.payload);
        }
        saveState(state);
      })
      .addCase(saveProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentProject, updateProject, addProject, updateColors } = projectSlice.actions;
export default projectSlice.reducer;
