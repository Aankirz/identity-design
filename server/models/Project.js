// models/Project.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  colors: {
    Primary: [{ label: String, value: String }],
    Secondary: [{ label: String, value: String }],
  },
  plan: { type: String, required: true },
  env: { type: String, required: true },
  updated: { type: String, required: true },
});

module.exports = mongoose.model('Project', ProjectSchema);
