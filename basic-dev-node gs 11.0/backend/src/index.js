const express = require('express')
const { uuid } = require('uuidv4')

const app = express()

app.use(express.json())

app.get('/projects', (request, response) => {
  return response.json({status: "OK!"})
})

app.listen(3333, () => {
  console.log('Back-end starded!')
})