const express = require('express');
const db = require('./data/db')

const server = express();

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.post('/users', (req, res) => {
    db.insert(req)
        .then(promise=>{
            console.log(promise)
            res.status(200).json(promise)
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json(err)
        })

})

server.get('/users', (req, res) => {
    db.find()
        .then(promise=>{
            console.log(promise)
            res.status(200).json(promise);
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json(err)
        })
});

server.get('/users/:id', (req, res) => {
    db.findById(id)
        .then(promise=>{
            console.log(promise)
            res.status(200).json(promise);
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json(err)
        })
});

server.delete('/users/:id', (req, res) => {
    db.remove(id)
        .then(promise=>{
            console.log(promise)
            res.status(200).json(promise);
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json(err)
        })
});

server.put('/users/:id', (req, res) => {
    db.update(id, req)
        .then(promise=>{
            console.log(promise)
            res.status(200).json(promise);
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json(err)
        })
});

server.listen(8000, () => console.log('API running on port 8000'));
