import User from "../models/user.model.js";

export const getUsers=async(req,res,next)=>{
    try {
        const users= await User.find();
        res.status(200).json({
            success:true,
            message: "Users found",
            data: users
        })
    } catch (error) {
        next(error);
    }
}

export const getUser=async(req,res,next)=>{
    try {
        const UserId=req.params.id;
        const user= await User.findOne({_id:UserId}).select('-password');

        if(!user){
            const error = new Error("User not found");
            error.statusCode=404;
            throw error;
        }

        res.status(200).json({
            success:true,
            message: "User found",
            user:user
        });

    } catch (error) {
        next(error);
    }
}