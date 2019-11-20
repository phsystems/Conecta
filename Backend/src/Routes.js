const express = require('express');
const FeedController = require('./controllers/FeedController');
const InterestsController = require('./controllers/InterestsController');

const routes = express.Router();

 routes.get('/devs', FeedController.index);
 routes.post('/devs', FeedController.store); 
 routes.get('/listInterests',FeedController.listInterest);

 routes.post('/devs/interests', InterestsController.createInterest);
 routes.get('/devs/detailsUser/:userId', InterestsController.userData);
 routes.get('/devs/interests/:interestId', InterestsController.listInterestsUser); 
 routes.delete('/devs/interests/:interestId', InterestsController.deleteInterest);
 routes.put('/devs/interests/:interestId', InterestsController.editInterest);
 



 
 module.exports = routes;
