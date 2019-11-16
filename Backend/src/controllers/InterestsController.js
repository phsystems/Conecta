const Dev  = require('../models/Users');

module.exports = {
    async store(req, res){
        console.log(req.io, req.connectedUsers);
        console.log(req.params.devId);
        console.debug(req.headers.user);
        const { user }  = req.headers;
        const { devId } = req.params;    

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev){
            return res.status(400).json({ error: 'User not exixts' });
        }
        if (targetDev.likes.includes(loggedDev._id)){
            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[devId];
            

            // TODO: Ver Com o Jean !

            if (loggedSocket){
                req.io.to(loggedSocket).emit('match', targetDev);
            }
            if (targetSocket){
                req.io.to(targetSocket).emit('match', loggedDev);
            }
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();
        
        return res.json(loggedDev); 
    },

    async createInterest(req,resp){

        const { user }  = req.headers;
        
        const loggedDev = await Dev.findById(user);
        
        if(!loggedDev){ 
            return res.status(400).json({ error: 'User not logged' });
        }
        else{
                try {
                    const interest = await Interest.create( req.body, req.userId);
             
                    return res.send({interest});
                    
                } catch (error) {
                    return res.status(400).send({ error:'Error creating new Interests' });
                    
                }
             
        };
    },
    async deleteInterest(req, res){
        try {
            await Interest.findByIdAndRenove(req.params.interestId);
          return res.send()  
        } catch (error) {
           return res.status(400).send({ error:'Error deleting interest' });
            
        }
     
    },

    async listInterestsUser(req, res) {
        try {
            const interest = await Interest.findById(req.params.interestId).populate('user');
          return res.send({interest})  
        } catch (error) {
           return res.status(400).send({ error:'Error loading interests' });
            
        }
    },
    async editInterest(req, res){
        res.send({user: req.userId})
     
     }
         
};