import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { createSubscription, getSubscription, getAllSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter=Router();


subscriptionRouter.get('/',getAllSubscriptions);

subscriptionRouter.get('/:id',getSubscription);

subscriptionRouter.post('/',authorize, createSubscription);

subscriptionRouter.delete('/:id',(req,res)=>res.send({title:'DELETE subscription'}));

subscriptionRouter.get('/user/:id',(req,res)=>res.send({title:'GET all user subscription'}));

subscriptionRouter.get('/:id/cancel',(req,res)=>res.send({title:'CANCEL subscription'}));

subscriptionRouter.get('/upcoming-renewals',(req,res)=>res.send({title:'GET upcoming renewals'}));




export default subscriptionRouter;