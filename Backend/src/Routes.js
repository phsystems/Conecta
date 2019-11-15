const express = require('express');
const DevController = require('./controllers/FeedController');
const TeachController = require('./controllers/TeachController');
const LearnController = require('./controllers/LearnController');

const routes = express.Router();

 routes.get('/devs', DevController.index);
 routes.post('/devs', DevController.store); 
 routes.get('/devs/:devId/listInterest',DevController.listInterest);
 
 routes.post('/devs/:devId/Teach', TeachController.store);
 routes.post('/devs/:devId/Learn', LearnController.store);
 routes.get('/devs/:interestId/listInterestsUser', LearnController.listInterestsUser);
 routes.post('/devs/:interestId/createInterest', LearnController.createInterest);
 routes.delete('/devs/:interestId/deleteInterest', LearnController.deleteInterest);
 routes.put('/devs/:interestId/editInterest', LearnController.editInterest);
 



 
 module.exports = routes;

 //GET, POST, PUT, DELETE 
/*
routes.get('/', (req, res) => {csilvei
    //return res.send(`Hello ${req.query.name}`);
    return res.json({message: `Hello  ${req.query.name}`});
 }); */

/* routes.post('/devs', (req, res) => {
     console.log(req.body);
    return res.json({ ok: true });
 }); */