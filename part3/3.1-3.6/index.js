const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
      
      
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
      
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
  ]

  const generateId = () => {
      return Math.floor((Math.random() * 1000))
  }

  app.get('/api/persons', (request, response) => {
      response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
      const id = Number(request.params.id)
      const person = persons.find(person => person.id === id)
      if (person) {
          response.json(person)
      } else (
          response.status(404).send()
      )
  })
  
  app.post('/api/persons', (request, response) => {
      const body = request.body
      const nameMatch = persons.find(person => person.name === body.name)
      const numberMatch = persons.find(person => person.number === body.number)
      console.log(body)
      if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
      } else if (nameMatch) {
          return response.status(403).json({
              error: 'name is not unique'
          })
      } else if (numberMatch) {
          return response.status(403).json({
              error: 'number is not unique'
          })
      }

      const id = generateId()

      const newPerson = {
        id: id,
        name: body.name,
        number: body.number,
      }

      persons = persons.concat(newPerson)

      response.json(newPerson)

  })

  app.delete('/api/persons/:id', (request, response) => {
      const id = Number(request.params.id)
      persons = persons.filter(person => person.id !== id)
      
      response.status(204).send()
  })

  app.get('/info', (request, response) => {
      response.send(`<p>Phonebook has info for ${persons.length} people</p></br><p>${Date().toString()}</p>`)
  })

  const PORT = 3001
  app.listen(3001)
  console.log(`server running on port ${PORT}`)