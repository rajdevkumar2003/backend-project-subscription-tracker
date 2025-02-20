import express from 'express';

import {PORT} from './config/env.js';

import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import authRouter from './routes/auth.routes.js';
import connectToDb from './database/mongodb.js';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middleware/error.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(errorMiddleware);

app.use('/api/v1/users',userRouter);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/subsription',subscriptionRouter);


app.get('/',(req, res) => res.send('hello world'));

app.listen(PORT,async()=>{
    console.log(`listening on port http://localhost:${PORT}`);
    await connectToDb();
});

export default app;