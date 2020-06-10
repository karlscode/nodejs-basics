const express = require('express')
const { uuid } = require('uuidv4')

const app = express()

app.use(express.json())

const projects = []

app.get('/projects', (request, response) => {
  const { title } = request.query

  const results = title 
    ? projects.filter(project => project.title.inlucdes(title))
    : projects

  return response.json(results)
})



app.listen(3333, () => {
  console.log('Back-end starded!')
})