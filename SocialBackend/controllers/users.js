import User from "../models/User.js";
import logger from "../logger.js";
/*READ*/
export const getUser = async(req,res) =>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
        logger.info('User fetch operation');
    }catch(e){
        logger.error(`Events Error: Error fetching User with id ${req.params}`);
        res.status(404).json({message: err.message});
    }
}

export const getUserFriends = async (req,res) =>{
    try{
        const {id}= req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({_id,firstName,lastName,occupation, location, picturePath})=>{
                return {_id,firstName,lastName,occupation, location, picturePath}
            }
        );
        logger.info('Fetch friends operation');
        return res.status(200).json(formattedFriends);
    }
    catch(e){
        logger.error(`Events Error: Error fetching friends of user with id ${req.params}`);
        res.status(404).json({message: err.message})
    }
};

/* UPDATE- From url we are getting IDs for user and it's friend which needs to be added/removed*/ 
export const addRemoveFriend = async (req,res) =>{
    try{
        const {id, friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friends.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();
        
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({_id,firstName,lastName,occupation, location, picturePath})=>{
                return {_id,firstName,lastName,occupation, location, picturePath}
            }
        );
        logger.info('Add/ Remove friends operation')
        return res.status(200).json(formattedFriends);
    
    }
    catch(e){
        logger.error(`Events Error: Error adding/removing friends of user with id ${req.params.id}`);
        res.status(404).json({message: e.message})   
    }
}