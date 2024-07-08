// routes/api/projects.js
const express = require('express');
const router = express.Router();
const Project = require('../../models/Project'); // Assuming you have a Project model

// Save project
router.post('/save', async (req, res) => {
  try {
    const { name, colors, spacing, radius, components, plan, env, updated } = req.body;
    let project = await Project.findOne({ name });

    if (project) {
      // Update existing project
      project.colors = colors;
      project.spacing = spacing;
      project.radius = radius;
      project.components = components;
      project.plan = plan;
      project.env = env;
      project.updated = updated;
      await project.save();
    } else {
      // Create new project
      project = new Project({ name, colors, spacing, radius, components, plan, env, updated });
      await project.save();
    }

    res.status(200).send({ message: 'Project saved successfully!' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Get all projects
router.get('/', async (req, res) => {
    try {
      const projects = await Project.find();
      res.status(200).send(projects);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

module.exports = router;
