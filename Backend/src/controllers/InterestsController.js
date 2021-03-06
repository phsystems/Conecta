const User = require('../models/Users');
const Interests = require('../models/Interests');

module.exports = {
    async store(req, res) {
        console.log(req.io, req.connectedUsers);
        console.log(req.params.devId);
        console.debug(req.headers.user);
        const { user } = req.headers;
        const { devId } = req.params;
        console.log(user)
        const loggedUser = await User.findById(user);
        const targetUser = await User.findById(devId);

        if (!targetUser) {
            return res.status(400).json({ error: 'User not exixts' });
        }
        if (targetUser.likes.includes(loggedUser._id)) {
            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[devId];
            if (loggedSocket) {
                req.io.to(loggedSocket).emit('match', targetUser);
            }
            if (targetSocket) {
                req.io.to(targetSocket).emit('match', loggedUser);
            }
        }
        loggedUser.likes.push(targetUser._id);
        
        await loggedUser.save();

        return res.json(loggedUser);
    },
    async createInterest(req, res) {

        const { user } = req.headers;
        
        const loggedDev = await User.findById(user);

        if (!loggedDev) {
            return res.status(400).json({ error: 'User not logged' });
        }
        else {
            try {
                const newInterest = Object.assign(req.body, { user: user });
                const interest = await Interests.create(newInterest);

                return res.send({ interest });

            } catch (error) {
                console.error(error);
                return res.status(400).send({ error: 'Error creating new Interests' });
            }
        };
    },
    async deleteInterest(req, res) {
        try {
            await Interests.findByIdAndRemove(req.params.interestId);
            return res.send({mensagem:'Removido com sucesso !'})
        } catch (error) {
            return res.status(400).send({ error: 'Error deleting interest' });
        }
    },
    async listInterestsUser(req, res) {
        try {
            const { interestId } = req.params;
            const interests = await Interests.find({user: interestId}).populate('user');
            return res.send(interests);
        } catch (error) {
            return res.status(400).send({ error: 'Error loading interests' });
        }
    },
    async editInterest(req, res) {

        const  {interestId,user} = req.body
        const interest = await Interests.update({_id:interestId},{interestUser:user});  
        
        
        res.send( await Interests.findById(interestId));
   
    },
    
    async userData(req, res) {
        try {

            console.log(req.params)
            const { userId } = req.params;

            const user = await User.findById(userId);
            console.log(user);
            return res.send(user);

        } catch (error){
            return res.status(400).send({ error: 'Error loading User data' });
        }
    }
};