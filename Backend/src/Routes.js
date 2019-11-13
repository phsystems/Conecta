const express = require('express');
const DevController = require('./controllers/FeedController');
const TeachController = require('./controllers/TeachController');
const LearnController = require('./controllers/LearnController');

const routes = express.Router();

 routes.get('/devs', DevController.index);
 routes.post('/devs', DevController.store); 
 
 routes.post('/devs/:devId/Teach', TeachController.store);
 routes.post('/devs/:devId/Learn', LearnController.store);
 routes.post('/devs/:devId/CreateLearn', LearnController.createLearn);
 
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