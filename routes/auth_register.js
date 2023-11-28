const express = require('express')
const route_register = express.Router()
const bcrypt = require('bcrypt')
const db = require('../db')
// const generateRandom4DigitNumber = require('./randomNumber')

route_register.post('/auth_register', async (req, res) => {
let {
    firstName, lastName, username, email, password, agree_terms
} = req.body;

const saltRound = 10;
const salt = await bcrypt.genSaltSync(saltRound);
const hash = await bcrypt.hashSync(password, salt)

let store_credentials = `insert into registered_users(firstName, lastName, username, email, user_password, agree_terms) values(?, ?, ?, ?, ?, ?)`;

db.query(`select email from registered_users where email = '${email}'`, async (err, result) => {
    if(err) {
        await console.log("Error")
        return;
    }

    db.query(`select username from registered_users where username = '${username}'`, async (err, res_username) => {
        if(err) {
            console.log("error in querying username from the database");
            return;
        }

        const registered = 'Email or username already registered';

        if(result.length > 0 || res_username.length > 0) {
            console.log(result);
            // console.log(res_username);
           await  res.json(registered)
            return;
        }
    
        else {
            // let randomID = await generateRandom4DigitNumber();
            // console.log(req.body);
            
            db.query(store_credentials, [firstName, lastName, username, email, hash, agree_terms], async (err, result) => {
                if(err) {
                    console.log("Error in creating account");
                    return;
                }
                else {
                    await res.redirect('/login');
                }
            })
    
            // await res.redirect('/login')
        }
    })

})

})

module.exports = route_register;