//This returns a function
const express=require('express');
const mongoose = require('mongoose');
const cookieParser=require('cookie-parser');
//calling the express function
const app=express();
const complains=require('./routes/Complains');
const loged=require('./routes/login');
const Complain=require('./models/complain');
const checkAuth=require('./middleware/auth');

//built in middleware for serving static files
app.use(cookieParser());
app.use(express.static('public'));

// complain api routes
var bodyParser = require('body-parser');
const { use } = require('./routes/Complains');


app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());
app.use('/complains',complains);


app.use('/loged',loged);
//mongoose.connect returns a promise

const connection_url =  'mongodb://localhost/HostelManagement';

mongoose.connect(connection_url, {useNewUrlParser:true})
    .then(()=>console.log('Connected to MongoDB...'))
    .catch(err=>console.error('Could not connect to MongoDb'));

    
// set template engine as ejs
// express by default looks for view engines in '/views' directory
app.set('view engine', 'ejs');


// recognize the incoming Request Object as a JSON Object


// basic routes

app.get('/', (req, res) => {
    Complain.find({},function(err,data){
        // console.log(data);
        res.render('index',{data});
    })
});

app.get('/complaint', checkAuth,(req, res,err) => {
    // rendering index page as profile doesn't exist yet
    res.render('complaintForm');
});

app.get('/error',(req,res)=>{
    res.render('error');
})

app.get('/profile',checkAuth,(req, res) => {

    // console.log(req.userData);
   Complain.find({name:req.query.name},function(err,userdata){
       console.log(userdata);
         const datas={
            email:req.userData.email,
            name:req.userData.name,
            RoomNo:req.userData.RoomNo,
            HostelName:req.userData.HostelName,
            TotalComplain:userdata.length,
        }
        res.render('profile',{datas});
   })      
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
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('sign');
});


const port =process.env.PORT || 3000;
//asynchronous function handles wih callback
app.listen(port,()=>console.log(`Listening to port ${port}...`));