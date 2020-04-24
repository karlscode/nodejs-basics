/* eslint-disable eqeqeq */
/* eslint-disable no-console */
const express = require('express');

const server = express();

/**
 * Sets JSON as the standard API response.
 */
server.use(express.json());

/**
 * Initialized project array;
 * Structure of a new project:
 * [
 *  {
 *    id: "1",
 *    title: "Novo projeto",
 *    tasks: ["Nova tarefa"]
 *  }
 * ];
 */
const projects = [];

/**
 * Middleware checks if the projects exists.
 */
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find((p) => p.id == id);

  if (!project) {
    return res.status(400).send({ error: 'Project not found.' });
  }

  return next();
}

/**
 * Middleware requests counter.
 */
function logRequests(req, res, next) {
  console.count('Requests number.');
  return next();
}

server.use(logRequests);

/**
 * Returns all projects.
 */
server.get('/projects', (req, res) => res.status(200).send(projects));


/**
 * Route params: id;
 * Returns the project with id in the route parameters.
 */
server.get('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const project = projects.find((p) => p.id == id);

  return res.status(200).send(project);
});

/**
 * Request body: id, title;
 * Add new project.
 */
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

/**
 * Route params: id;
 * Request body: title;
 * Update the project title using the present route parameters of the ID.
 */
server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find((p) => p.id == id);

  project.title = title;

  return res.status(201).send(project);
});

/**
 * Route params: id;
 * Removes a project with an id in the route parameters.
 */
server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex((p) => p.id == id);

  projects.splice(projectIndex, 1);

  return res.status(204).send();
});

/**
 * Route params: id;
 * Request body: title;
 * Add a new task to the existing project with the associated id.
 */
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find((p) => p.id == id);

  project.tasks.push(title);

  return res.status(201).send(project);
});

server.listen(3000);
