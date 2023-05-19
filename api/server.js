// BUILD YOUR SERVER HERE
const Users = require('./users/model')

const express = require('express')

const server = express()

server.use(express.json())


//Endpoints

//gets all users
server.get('/api/users', (req, res) => {
    Users.find().then(users => res.json(users))
})

//gets users by id
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    Users.findById(id).then(user => {
        if(user == null){
            res.status(404).json
            ({message: "The user with the specified ID does not exist"})
        } else {
            res.json(user)
        }
    })
})

server.post ('/api/users', (req, res) => {
    let body = req.body
    if(body.name == null || body.bio == null) {
        res.status(400).json
        ({ message: "Please provide name and bio for the user"})
        return;
    } 
    Users.insert(body).then(user => {
        res.status(201).json(user)
    })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    Users.remove(id).then(user => {
        if(user == null){
            res.status(404).json
            ({ message: "The user with the specified ID does not exist" })
        } else {
            res.json(user)
        }
    })
})

server.put('/api/users/:id', (req, res) =>{
    let body = req.body;

    if(body.name == null || body.bio == null) {
        res.status(400).json
        ({ message: "Please provide name and bio for the user"})
        return;
    } 
    
    Users.update(req.params.id, body).then(user => {
        if(user == null){
            res.status(404).json
            ({message: "The user with the specified ID does not exist"})
        } else {
            res.status(200).json(user)
        }
        
    })
})





module.exports = server; // EXPORT YOUR SERVER instead of {}