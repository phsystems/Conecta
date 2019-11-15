const axios = require('axios');
const Dev = require('../models/Users');
const Interest = require('../models/Interests');



module.exports = { 
    async index(req, res){
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and:[
                { _id: { $ne: user} },
                { _id: { $nin: loggedDev.likes}},
                { _id: { $nin: loggedDev.dislikes}},
            ],
        })

        return res.json(users);
    },
    async store(req, res){
        const { username } = req.body;      
        const userExists = await Dev.findOne({ user: username});
        if(userExists){
            return res.json(userExists);
        }
        const response =  await axios.get(`https://api.github.com/users/${username}`);        
        const { name, bio, avatar_url } = response.data;
        //console.log(response.data);
        const dev = await Dev.create({
           name,
            user: username,
            bio,
            avatar: avatar_url
        })
        return res.json(dev);
        //return res.json(response.data);
    },
    async listInterest(req, res){
        try {
            const interests = await Interest.find().populate('user');
           return res.send({interests})
        } catch (error) {
           return res.status(400).send({ error:'Error loading interests' });
            
        }
    
    },


};


