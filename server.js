const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const knex = require('knex');
const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    }
  });

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header(Access-Control-Allow-Origin, 'https://still-hamlet-73992.herokuapp.com/');
  res.header(Access-Control-Allow-Methods, GET,PUT,POST,DELETE);
  res.header(
  Access-Control-Allow-Headers,
  Origin, X-Requested-With, Content-Type, Accept
  );
  next();
  });
app.options('https://still-hamlet-73992.herokuapp.com/', cors());


port = process.env.PORT || 4000;

app.get('/',(req,res) =>res.json('Working'));
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register',(req,res)=>{ register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})


app.listen(port,()=> {
    console.log(`app is running in port:${port}`)
})