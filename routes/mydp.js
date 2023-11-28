const db = require('../db')
const express = require('express')
const fs = require('fs')
const path = require('path')
const mydp = express.Router()

mydp.get('/', async (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (loggedIn) {
        const data_id = req.session.user;

        await db.query(`select dp from registered_users where id = ?`, [data_id], async (err, profile_pic) => {
            if (err) {
                console.log('Error in getting DP');
                return;
            }
            if (profile_pic.length > 0) {
                const image_name = profile_pic[0].dp;
                // console.log(image_name);
                const image = path.join(__dirname, `../uploads/${image_name}`)

                if (fs.existsSync(image)) {
                    await res.sendFile(image)
                }
                else {
                    const default_dp = path.join(__dirname, `../uploads/dp.jpg`)
                    await res.sendFile(default_dp)
                }

            }
            else {
                // const default_dp = path.join(__dirname, `../uploads/dp.jpg`)
                // res.sendFile(default_dp)
            }
        })
    }
})

mydp.get('/remove_profile', async (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (loggedIn) {
        const data_id = req.session.user;
        await db.query(`select dp from registered_users where id = ?`, [data_id], async (err, result) => {
                if(err) {
                    console.log('error in getting your profile pic');
                    return;
                }
                                    
                else {
                    await db.query(`update registered_users set dp = null where id = ?`, [data_id], async (err) => {
                        if(err) {
                            console.log('Error in removing your profile pic');
                            return;
                        }
                        else {
                            await res.sendStatus(200);
                        }
                    })
                }
        })

    }
    else {
        await res.redirect('/');
    }
})

module.exports = mydp;