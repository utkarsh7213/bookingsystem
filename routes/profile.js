const db = require('../db')
const express = require('express')
const profile = express.Router()

profile.get('/my_account', async (req, res) => {
    const loggedIn = req.session.loggedIn;
    if (loggedIn) {
        const data_id = req.session.user;
        const user_account = `select firstName, lastName, username, email, dob, user_address, city, region, zipcode, country, phoneno from registered_users where id = '${data_id}'`;

        await db.query(user_account, async (err, user_result) => {
            if (err) {
                console.log('Error in displaying My account');
                return;
            }
            else {
                
                await res.render('profile/my_account', {
                    user_account_info : user_result[0]
                })
            }
        })

    }
    else {
        await res.redirect('/login')
    }
})

// PROFILE MY_TRIPS BOOKING
profile.get('/my_trips', async (req, res) => {   
    const loggedIn = req.session.loggedIn;
    if (loggedIn) {
        const data_id = req.session.user;
        const get_trip_data = 'select * from book_tour where user_id = ?';
        
        await db.query(get_trip_data, [data_id], async (err, result) => {
            if(err) {
                console.log('ERROR in getting trip data');
                return;
            }
            
            if(result.length > 0) 
            {
                // console.log(result);
                await res.render('profile/mytripedit', {
                    user_loggedIn : data_id,
                    trip_data : result
                });    
            }
            else {
                await res.render('profile/mytripempty', {
                    user_loggedIn : data_id,
                    trip_data : ''
                })
            }         
        });  
    }
    else {
        res.redirect('/')
    }
})

// PROFILE MY_TRIP_CONFIRM RENDER
profile.get('/mytrip_confirm', async (req, res) => {
    const loggedIn = req.session.loggedIn;
    if (loggedIn) {
        const data_id = req.session.user;

        if(req.headers.referer === 'http://localhost:5000/profile/my_trips') {
            const user_details = 'select * from registered_users where id = ?';
    
            db.query(user_details, [data_id], async (err, user_res) => {
                if(err) {
                    console.log('Error while retrieving user data');
                    return;
                }
                if(user_res.length > 0) {
                    await res.render('profile/mytripconfirm', {
                        user_res : user_res[0]
                    })
                }
                else {}
            })
        }
        else {
            await res.status(403).send('<h1>403 Forbidden</h1>');
        }
    }
    else {
        await res.redirect('http://localhost:5000/profile/my_trips')
    }
})

// POST REQUEST FOR CONFIRMING MY TRIP 
profile.post('/confirm_trip', async (req, res) => {
    const loggedIn = req.session.loggedIn;
    if (loggedIn) {
        const data_id = req.session.user;
        const check_trip_details = `SELECT * FROM book_tour WHERE user_id = ?`;

        db.query(check_trip_details, [data_id], async (err, trip_res) => {
            if (err) {
                res.send('Error in getting your trip details');
                return;
            }

            const insertPromises = [];

            for (const trip of trip_res) {

                const store_booking = `insert into booked_tours(
                    user_id, title, loc_ation, des_cription, total_charges, booked_date, tour_id,
                    senior_charges, youth_charges, children_charges, adult_charges, infant_charges, 
                    seniors_quantity, youths_quantity, infants_quantity, children_quantity, adults_quantity,
                    charges, travel_time, typ_e, available_lang, excursion_id
                    ) values(
                        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                        )`;


                const values = [
                    data_id,
                    trip.title,
                    trip.loc_ation,
                    trip.des_cription,
                    trip.total_charges,
                    trip.booked_date,
                    trip.tour_id,
                    trip.senior_charges,
                    trip.youth_charges,
                    trip.children_charges,
                    trip.adult_charges,
                    trip.infant_charges,
                    trip.seniors_quantity,
                    trip.youths_quantity,
                    trip.infants_quantity,
                    trip.children_quantity,
                    trip.adults_quantity,
                    trip.charges,
                    trip.travel_time,
                    trip.typ_e,
                    trip.available_lang,
                    trip.excursion_id,
                ];

                const insertPromise = new Promise((resolve, reject) => {
                    db.query(store_booking, values, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
                insertPromises.push(insertPromise);
            }
            Promise.all(insertPromises)
                .then(() => {
                    // After inserting, delete records from book_trip
                    const deleteQuery = `DELETE FROM book_tour WHERE user_id = ?`;
                    db.query(deleteQuery, [data_id], (err) => {
                        if (err) {
                            res.send('Error while removing trip details from MyTrips');
                        } else {
                            res.render('profile/mytripsuccess', {
                                user: data_id,
                            });
                        }
                    });
                })
                .catch((err) => {
                    res.send('Error while Booking your details');
                });
        });
    } else {
        res.redirect('/login');
    }
});

// SETTINGS PAGE
profile.get('/settings', async (req, res) => {
    const loggedIn = req.session.loggedIn;
    if (loggedIn) {
        const data_id = req.session.user;
        res.render('profile/settings', {
            user_loggedIn : data_id
        })

    }
})


// MY BOOKINGS WEBPAGE 
profile.get('/my_bookings', async (req, res) => {
    const loggedIn = req.session.loggedIn;
    if (loggedIn) {
        const data_id = req.session.user;       
        const mybookings = `select * from booked_tours where user_id = ?`;

        db.query(mybookings, [data_id], async (err, booked_result) => {
            if(err) {
                res.send('Error while getting Booking details');
                return;
            }
            if(booked_result.length > 0) {

                await res.render('profile/mybookingedit', {
                    booked_res : booked_result
                })
            }
            else {
                await res.render('profile/mybooking');
            }
        })
    }
    else {
        await res.redirect('/login')
    }
})

module.exports = profile;