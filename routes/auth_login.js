const express = require('express')
const route_login = express.Router()
const bcrypt = require('bcrypt')
const db = require('../db')

route_login.post('/auth_login', async (req, res) => {
    let {
        user_or_email, password
    } = req.body;

    const get_user = `select id, email, username, user_password from registered_users where email = '${user_or_email}' or username = '${user_or_email}'`;

    db.query(get_user, async (err, result) => {
        if (err) {
            console.log("Error in login to your account");
            return;
        }
        if (result.length > 0) {
            const is_right = bcrypt.compareSync(password, result[0].user_password);

            if (is_right) {
                const user_data = {
                    username : result[0].username,
                    id : result[0].id
                }
                // res.cookie(encodeURIComponent('user'), encodeURIComponent(JSON.stringify(user_data)), { maxAge: 90000000e4, httpOnly: true });

                req.session.user = user_data.id;
                req.session.loggedIn = true;

                await res.redirect('/');
            }


            else {
                await res.json({
                    incorrect: "Email or password is incorrect"
                })
            }
        }
        else {
            await res.json({
                incorrect: "Email or password is incorrect"
            })
        }
    })
})

module.exports = route_login;