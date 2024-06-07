const  express = require('express')
const app = express()
app.use(express.json())
let persons= [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]



app.get('/api/persons',(request, response) => {
    response.json(persons)
  })



  app.get('/api/info',(request, response) => {
    const fecha =new Date()
    const nNumeros = persons.length
    response.send(`
    <p> PhoneBook has info for ${nNumeros}<p>
    
    <p>${fecha.toString()}</p>
  `)
  })


  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
     persons = persons.filter(person => person.id != id)
    

      response.status(204).end()
 
  })

  app.post('/api/persons', (request, response) => {
    const ID = Math.floor(Math.random()*10000000000)
  
    const body = request.body

    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })}

  const nameExists = persons.some(person => person.name === body.name)
  if (nameExists) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

    const person = {
        number: body.number,
        name: body.name,
        id: ID,
      }
      persons= persons.concat(person)

      response.json(person)
    })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})