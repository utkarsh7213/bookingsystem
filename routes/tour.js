const db = require('../db')
const express = require('express')
const tour = express.Router()

tour.get('/', (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (loggedIn) {
        const data_id = req.session.user;
        const tour_data = 'select * from tour';
        db.query(tour_data, async (err, tour_loc_result) => {
            if (err) {
                console.log('Error in fetching locations');
                return;
            }
            res.render('tour', {
                user_loggedIn : data_id,
                location : tour_loc_result,                
            })
        })       
    }
    else {
        const tour_data = 'select * from tour';
        db.query(tour_data, async (err, tour_loc_result) => {
            if (err) {
                console.log('Error in fetching locations');
                return;
            }
            // await res.json(tour_loc_result)
    
            res.render('tour', {
                user_loggedIn : '',
                location : tour_loc_result,
                
            })
    
        })
    }
})


// RENDER EXCURSIONS WEBPAGE
tour.get('/excursions', async (req, res) => {
    const loggedIn = req.session.loggedIn;
    
    if (loggedIn) {
        const data_id = req.session.user;
        const excursion_data = 'select * from excursions';
        db.query(excursion_data, async (err, excursion_loc_result) => {
            if (err) {
                console.log('Error in fetching locations');
                return;
            }
            
            res.render('excursions', {
                user_loggedIn: data_id,
                location : excursion_loc_result
            })
        })  
        
    }
    else {
        const excursion_data = 'select * from excursions';
        db.query(excursion_data, async (err, excursion_loc_result) => {
            if (err) {
                console.log('Error in fetching locations');
                return;
            }
            
            res.render('excursions', {
                user_loggedIn: '',
                location : excursion_loc_result
            })
        })
    }
})


// Render TRANSPORT WEBPAGE
tour.get('/transport', async (req, res) => {
    const loggedIn = req.session.loggedIn;
    
    if (loggedIn) {
        const data_id = req.session.user;
        const transport_data = 'select * from transport';
        db.query(transport_data, async (err, transport_res) => {
            if (err) {
                console.log('Error in fetching Transport Webpage');
                return;
            }

            res.render('transport', {
                user_loggedIn : data_id,
                transport : transport_res,                
            })

        })       
    }
    else {
        const transport_data = 'select * from transport';
        db.query(transport_data, async (err, transport_res) => {
            if (err) {
                console.log('Error in fetching Transport Webpage');
                return;
            }
    
            res.render('transport', {
                user_loggedIn : '',
                transport : transport_res,
                
            })
        })
    }
})


// RENDER HOTELS WEBPAGE

tour.get('/hotels', async (req, res) => {
    const loggedIn = req.session.loggedIn;
    
    if (loggedIn) {
        const data_id = req.session.user;

        const tour_data = 'select * from hotels';
        await db.query(tour_data, async (err, hotels_result) => {
            if (err) {
                console.log('Error in fetching hotels');
                return;
            }
            await res.render('hotels', {
                user_loggedIn: data_id,
                hotels_res : hotels_result,                
            })
        })       
    }
    else {
        const tour_data = 'select * from hotels';
        await db.query(tour_data, async (err, hotels_result) => {
            if (err) {
                console.log('Error in fetching hotels');
                return;
            }
    
            await res.render('hotels', {
                user_loggedIn: '',
                hotels_res : hotels_result,   
            })
        })
    }
})


module.exports = tour;