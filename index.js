//This returns a function
const express=require('express');

const mongoose = require('mongoose');

//calling the express function
const app=express();

//built in middleware for serving static files
app.use(express.static('public'))

//mongoose.connect returns a promise
mongoose.connect('mongodb://localhost/HostelManagement')
    .then(()=>console.log('Connected to MongoDB...'))
    .catch(err=>console.error('Could not connect to MongoDb'));

// recognize the incoming Request Object as a JSON Object
app.use(express.json());



const port =process.env.PORT || 3000;
//asynchronous function handles wih callback
app.listen(3000,()=>console.log(`Listening to port 3000...`));