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
    const newUser = req.body
    if(!newUser.name || !newUser.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    else {
        db.insert(newUser)
        .then(promise=>{
            db.findById(promise.id)
                .then(user => {
                    res.status(201).json(user)
                })
                .catch(err=> {
                    res.status(501).json({ errorMessage: "New data inserted, but failed to retrieve immediately afterwards" })
                })
            
        })
        .catch(err=>{
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        })
    }
    

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

/* server.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    //async await method of resolving promise to grab user object
    var userAsync = {}
    try {
        userAsync = await db.findById(id)
    } catch(err) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
    console.log(userAsync)

    //.then method of resolving promise to grab user object
    var userThen = {}
    db.findById(id)
        .then(res => {
            userThen=res
        })
        .then(()=> {
            console.log(userThen)
        })
        .catch(err=>{
            res.status(500).json({ errorMessage: "The user information could not be retrieved." })
        })

    //...more code for db.remove to remove user

    } */
server.delete('/api/users/:id', (req, res) => {
    db.findById(id)
        .then(ele => {
            if(!!ele){
                db.remove(id)
                    .then(promise=>{
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
    var changes = req.body
    if(!changes.name || !changes.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    else db.findById(id)
        .then(user => {
            oldUser=user
            if(!!user) {
                db.update(id, changes)
                        .then(promise => {
                            db.findById(id)
                                .then(ele => {
                                    res.status(200).json(ele)
                                })
                                .catch(err=> {
                                    res.status(504).json( { message: 'User updated, but failed to retrieve updated info'})
                                })
                            
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
