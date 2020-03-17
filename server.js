const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'heisenberg123',
      database : 'brainapp'
    }
  });

  

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send(database.users);
})




//SIGN IN
app.post('/signin',(req, res) => {signin.handleSignin(req, res, db, bcrypt)});


//REGISTER
app.post('/register', (req, res) =>{register.handleRegister(req, res, db, bcrypt)});



//PROFILE ID
app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    db.select('*').from('users').where({id})
    .then(user => {
        if(user.length){
            res.json(user[0]);
        }else {
            res.status(400).json('not found!!')
        }
        
    }).catch(err =>res.status(400).json('user not found!!') )
})


app.listen(3001, ()=>{
    console.log('app is running');
    
})



//checking
// db.select('*').from('users').then(data => {
//     console.log(data[0]);
    
// })