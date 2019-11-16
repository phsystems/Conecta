const express = require('express');
const FeedController = require('./controllers/FeedController');
const TeachController = require('./controllers/TeachController');
const InterestsController = require('./controllers/InterestsController');

const routes = express.Router();

 routes.get('/devs', FeedController.index);
 routes.post('/devs', FeedController.store); 
 routes.get('/listInterest',FeedController.listInterest);
 
 routes.post('/devs/:devId/', InterestsController.store);

 routes.get('/devs/:interestId/listInterestsUser', InterestsController.listInterestsUser);
 routes.post('/devs/:interestId/createInterest', InterestsController.createInterest);
 routes.delete('/devs/:interestId/deleteInterest', InterestsController.deleteInterest);
 routes.put('/devs/:interestId/editInterest', InterestsController.editInterest);
 



 
 module.exports = routes;
