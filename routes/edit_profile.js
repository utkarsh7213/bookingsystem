const db = require('../db')
const express = require('express')
const edit_profile = express.Router()

edit_profile.post('/edit_profile', async (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (loggedIn) {
        const data_id = req.session.user;

        db.query(`select * from registered_users where id = '${data_id}'`, async (err, result) => {
            if(err) {
                console.log("error while getting user details");
                return;
            }
            else {
                const edit_user_data = req.body;
                const data_from_server = result[0];
 
                if(edit_user_data.firstName !== data_from_server.firstName) {
                    db.query(`update registered_users set firstName = ? where id = ?`, [edit_user_data.firstName, data_from_server.id], async (err, result) => {
                        if(err) {
                            console.log(`Error in updating FirstName of ${data_id}`);
                            return;
                        }
                    })
                    
                }

                if(edit_user_data.lastName !== data_from_server.lastName) {
                    db.query(`update registered_users set lastName = ? where id = ?`, [edit_user_data.lastName, data_from_server.id], async (err, result) => {
                        if(err) {
                            console.log(`Error in updating lastName of ${data_id}`);
                            return;
                        }
                    })
                }

                if(edit_user_data.dob !== data_from_server.dob) {
                    db.query(`update registered_users set dob = ? where id = ?`, [edit_user_data.dob, data_from_server.id], async (err, result) => {
                        if(err) {
                            console.log(`Error in updating DOB of ${data_id}`);
                            return;
                        }
                    })
                }

                if(edit_user_data.gender !== data_from_server.gender) {
                    db.query(`update registered_users set gender = ? where id = ?`, [edit_user_data.gender, data_from_server.id], async (err, result) => {
                        if(err) {
                            console.log(`Error in updating Gender of ${data_id}`);
                            return;
                        }
                    })
                }

                if(edit_user_data.email !== data_from_server.email) {
                    db.query(`update registered_users set email = ? where id = ?`, [edit_user_data.email, data_from_server.id], async (err, result) => {
                        if(err) {
                            console.log(`Error in updating Email of ${data_id}`);
                            return;
                        }
                    })
                }

                if(edit_user_data.address !== data_from_server.user_address) {
                    db.query(`update registered_users set user_address = ? where id = ?`, [edit_user_data.address, data_from_server.id], async (err, result) => {
                        if(err) {
                            console.log(`Error in updating Address of ${data_id}`);
                            return;
                        }
                    })
                }

                if(edit_user_data.city !== data_from_server.city) {
                    db.query(`update registered_users set city = ? where id = ?`, [edit_user_data.city, data_from_server.id], async (err, result) => {
                        if(err) {
                            console.log(`Error in updating city of ${data_id}`);
                            return;
                        }
                    })
                }

                if(edit_user_data.state !== data_from_server.region) {
                    db.query(`update registered_users set region = ? where id = ?`, [edit_user_data.state, data_from_server.id], async (err, result) => {
                        if(err) {
                            console.log(`Error in updating region of ${data_id}`);
                            return;
                        }
                    })
                }

                if(edit_user_data.zipcode !== data_from_server.zipcode) {
                    db.query(`update registered_users set zipcode = ? where id = ?`, [edit_user_data.zipcode, data_from_server.id], async (err, result) => {
                        if(err) {
                            console.log(`Error in updating zipcode of ${data_id}`);
                            return;
                        }
                    })
                }

                if(edit_user_data.country !== data_from_server.country) {
                    db.query(`update registered_users set country = ? where id = ?`, [edit_user_data.country, data_from_server.id], async (err, result) => {
                        if(err) {
                            console.log(`Error in updating country of ${data_id}`);
                            return;
                        }
                    })
                }

                if(edit_user_data.phoneno !== data_from_server.phoneno) {
                    db.query(`update registered_users set phoneno = ? where id = ?`, [edit_user_data.phoneno, data_from_server.id], async (err, result) => {
                        if(err) {
                            console.log(`Error in updating phoneno of ${data_id}`);
                            return;
                        }
                    })
                }
                await res.sendStatus(200)

            }
        })


    }
    else {
        await res.redirect('/login')
    }

})

module.exports = edit_profile;