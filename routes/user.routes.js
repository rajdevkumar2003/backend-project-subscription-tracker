import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter=Router();


userRouter.get('/',getUsers);

userRouter.get('/:id', authorize ,getUser);

userRouter.post('/user',(req,res)=>res.send({title:'CREATE new user'}));

userRouter.delete('/:id',(req,res)=>res.send({title:'DELETE user'}));

userRouter.put('/:id',(req,res)=>res.send({title:'UPDATE user'}));

export default userRouter;