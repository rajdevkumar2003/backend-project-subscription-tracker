import express from 'express';

const app = express();

app.get('/',(req,res)=>{
    res.send('server started by rajeev ');
});

app.listen(3000,()=>{
    console.log('listening on port http://localhost:3000');
});

export default app;