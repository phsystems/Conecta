const express = require('express');
const DevController = require('./controllers/FeedController');
const LikeController = require('./controllers/TeachController');
const DislikesController = require('./controllers/LearnController');

const routes = express.Router();

 routes.get('/devs', DevController.index);
 routes.post('/devs', DevController.store); 
 
 routes.post('/devs/:devId/likes', LikeController.store);
 routes.post('/devs/:devId/dislikes', DislikesController.store);
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