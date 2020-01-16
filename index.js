const express = require('express');
const cors = require('cors')
const db = require('./data/db')

const server = express();
server.use(express.json())
server.use(cors())

server.get('/', (req, res) => {
  res.send('Hello World');
});

//endpoint works
server.post('/api/users', (req, res) => {
    const user = req.body
    db.insert(user)
        .then(promise=>{
            res.status(201).json(user)
        })
        .catch(err=>{
            if(!user.name || !user.bio) {
                res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
            }
            else {
                res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
            }
            
        })

})

//endpoint works
server.get('/api/users', (req, res) => {
    db.find()
        .then(promise=>{
            res.status(200).json(promise);
        })
        .catch(err=>{
            res.status(500).json({ errorMessage: "The users information could not be retrieved." })
        })
});

//endpoint works
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(user=>{
            if(!!user) {
                res.status(200).json(user);
            }
            else {
                res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
            }
            
        })
        .catch(err=>{
            res.status(500).json({ errorMessage: "The user information could not be retrieved." })
        })
});

//endpoint works
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(ele => {
            if(!!ele){
                db.remove(id)
                    .then(promise=>{
                        console.log(promise)
                        if(promise===1) {
                            res.status(200).json(ele)
                        }
                        else res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })

                    })
                    .catch(err=> {
                        res.status(500).json({ errorMessage: "The user could not be removed" })
                    })
            }
            else res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
        .catch(err => {
            res.status(500).json({ errorMessage: "The user information could not be retrieved." })
        })
    })
});

//endpoint works
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    var newUser = req.body
    db.findById(id)
        .then(user => {
            oldUser=user
            if(!!user) {
                if(!user.name || !user.bio) {
                    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
                }
                else db.update(id, newUser)
                        .then(promise => {
                            res.status(200).json(newUser)
                        })
                        .catch(err => {
                            res.status(500).json({ errorMessage: "The user information could not be modified." })
                        })
                    
            }
            else {
                res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
            }
        })
        .catch(err=>{
            res.status(500).json({ errorMessage: "The user information could not be retrieved." })
        })
    
});

server.listen(8000, () => console.log('API running on port 8000'));
