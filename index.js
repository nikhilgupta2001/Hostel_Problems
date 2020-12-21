//This returns a function
const express=require('express');

const mongoose = require('mongoose');

//calling the express function
const app=express();
const complains=require('./routes/Complains')

//built in middleware for serving static files
app.use(express.static('public'))

//mongoose.connect returns a promise
mongoose.connect('mongodb://localhost/HostelManagement',{useNewUrlParser:true})
    .then(()=>console.log('Connected to MongoDB...'))
    .catch(err=>console.error('Could not connect to MongoDb'));

// set template engine as ejs
// express by default looks for view engines in '/views' directory
app.set('view engine', 'ejs');

// recognize the incoming Request Object as a JSON Object
app.use(express.json());



// basic routes
app.get('/', (req, res) => {
    // dummy data
    const data = {
        "name": "Dhrutik",
        "hostel": "Bhabha Bhavan",
        "room": "A-111",
        "complain": "Electrical Item",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "phone": 123456789
    };
    res.render('index', { data });
});

app.get('/profile', (req, res) => {
    // rendering index page as profile doesn't exist yet
    res.render('index');
});

app.get('/about', (req, res) => {
    // rendering index page as about-us doesn't exist yet
    res.render('index');
});

app.get('/contact', (req, res) => {
    // rendering index page as contact-us doesn't exist yet
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('auth');
});

app.get('/signup', (req, res) => {
    res.render('auth');
});



// complain api routes
app.use('/api/complains',complains);




const port =process.env.PORT || 3000;
//asynchronous function handles wih callback
app.listen(3000,()=>console.log(`Listening to port ${port}...`));