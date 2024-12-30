const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')
app.use(express.static('build'))
app.use(express.json())
app.use(cors())


morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}


const date = new Date()


app.post('/api/persons', (request, response,next) => {
   const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
  .save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})



app.get('/info', (request, response,next) => {
    response
    .send(`<p>Phonebook has info for ${persons.length} people <br> ${date}</p>`)
    .catch(error => next(error))
  })

app.get('/api/persons', (request, response,next) => {
  Person
  .find({}).then(persons => {      
   response.json(persons)
  })
  .catch(error => next(error))
  })

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if(person){
    response.json(person)
    }else{
      response.status(404).end()
    }
  })
  .catch(error => next(error))
  })  

app.put('/api/persons/:id', (request, response, next) => {
    const {name, number} = request.body
  
    Person.findByIdAndUpdate(request.params.id, {name, number}, { new: true, runValidators: true, context: 'query' })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })  

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
  })

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  
app.use(unknownEndpoint)  

app.use(errorHandler)  

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)