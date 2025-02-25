import Subscription from "../models/subscription.model.js";

export const createSubscription=async(req,res,next)=>{
    try {

        const subscription = await Subscription.create({
            ...req.body,
            user:req.user._id,
        });
        if(!subscription){
            const error=new Error("Couldn't create subscription");
            error.statusCode=401;
            throw error;
        }
        res.status(201).json({
            success:true,
            message:"Subscription created successfully",
            body:subscription
        });

    } catch (error) {
        next(error);
    }
}

export const getAllSubscriptions=async(req,res,next)=>{
    try {
        const subscriptions = await Subscription.find();
        if(!subscriptions){
            const error=new Error("Couldn't find any subscriptions");
            error.statusCode=501;
            throw error;
        }

        res.status(200).json({
            success:true,
            message:"Subscriptions fetched successfully",
            data: subscriptions
        });
    } catch (error) {
        next(error);
    }
}

export const getSubscription=async(req,res,next)=>{
    try{
        const id=req.params.id;

        const subscription = await Subscription.findOne({_id:id});
        if(!subscription){
            const error=new Error("Couldn't find subscription");
            error.statusCode=501;
            throw error;
        }

        res.status(200).json({
            success:true,
            message:"Subscription fetched successfully",
            subscription: subscription
        });
    }catch (error) {
        next(error);
    }
}