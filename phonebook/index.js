const { response } = require('express')
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


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

app.get('/api/Persons', (req, res) => {
    res.json(persons)
})

app.get('/api/Persons/:id', (req, res) => {
    const id = Number(req.params.id)

    const person = persons.find(currentPerson => currentPerson.id === id)

    console.log(person)

    if(person) {
        res.json(person)
    }else {
        res.status(404).end()
    }
})

app.delete('/api/Persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(currentPerson => currentPerson.id !== id)

    res.status(204).end()
})

app.get('/info', (req, res) => {
    const numberOfPeople = persons.length

    res.send(`
        <p>Phonebook has info for ${numberOfPeople}</p>
        <p>${new Date()}</p>
    `)
})

app.post('/api/Persons', (req, res) => {
    const body = req.body

    if(!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    }

    const id = Math.ceil(Math.random()*5000)
    let person = {}

    if(!body.number) {
        person = {
            id: id,
            name: body.name,
            number: ''
        }
    }else {
        person = {
            id: id,
            name: body.name,
            number: String(body.number)
        }
    }

    console.log("newPerson", person)

    persons = persons.concat(person)

    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})