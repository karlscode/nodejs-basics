/* eslint-disable eqeqeq */
/* eslint-disable no-console */
const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

/**
 * Middlewares
 */

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find((p) => p.id == id);

  if (!project) {
    return res.status(400).send({ error: 'Project not found.' });
  }

  return next();
}

function logRequests(req, res, next) {
  console.count('Request number');
  return next();
}

server.use(logRequests);

/**
 * Endpoints.
 */

server.get('/projects', (req, res) => res.status(200).send(projects));

server.get('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const project = projects.find((p) => p.id == id);

  return res.status(200).send(project);
});

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: [],
  };

  projects.push(project);

  return res.status(201).send(project);
});

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find((p) => p.id == id);

  project.title = title;

  return res.status(200).send(project);
});

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex((p) => p.id == id);

  projects.splice(projectIndex, 1);

  return res.status(204).send();
});

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find((p) => p.id == id);

  project.tasks.push(title);

  return res.status(201).send(project);
});

server.listen(3000);
