import Post from "../models/Post.js";
import User from "../models/User.js";
const logger = require("../logger.js");
/* CREATE */

export const createPost = async(req,res) =>{
    try{
        const {userId, description, picturePath } = req.body;
        const user  = User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save();

        const post = await Post.find(); // grabbing each and every post
        logger.info("New post uploaded")
        res.status(201).json(post);
    }catch(e){

        logger.error("Events Error: Post Creation Error");
        res.status(409).json({message: e.message});
    }
}

/* READ */

//  grabbing every post (same as above but here we are grabbing without creating new one)
export const getFeedPosts = async (req,res) =>{
    try{
        const post = await Post.find(); 
        res.status(200).json(post);
    }catch(e){
        logger.error("Events Error: Post Fetch Error");
        res.status(404).json({message: e.message});
    }
}


export const getUserPosts = async(req, res) =>{
    try{
        const {userId}=  req.params;
        const post = await Post.find({userId}); // grabbing each and every post
        logger.info("Post fetch operation");
        res.status(200).json(post);
    }
    catch(e){
        logger.error(`Events Error: Post Fetch Error of User ${req.params}`);
        res.status(404).json({message: e.message});
    }
}


export const likePost = async(req,res) =>{
    try{
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        } else {
            post.likes.set(userID, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new : true}
        );
        logger.info("Like/Dislike operation");
        res.status(200).json(updatedPost);
    }
    catch(e){
        logger.error(`Events Error: Post Like / Unlike Error of User`);
        res.status(404).json({ message: e.message});
    }
}