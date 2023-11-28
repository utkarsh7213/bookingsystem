const db = require('../db')
const express = require('express')
const explore = express.Router()

explore.get('/tours', async (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (loggedIn) {
        const data_id = req.session.user;
        const req_loc_id = req.query.locationid;

        if (req_loc_id === undefined || req_loc_id === null || req_loc_id === '') {
            res.sendStatus(404);
            return;
        }

        const loc_data = 'select * from tour where tour_id = ?';

        db.query(loc_data, [req_loc_id], async (err, result) => {
            if (err) {
                console.log('Error in fetching details of preferred loc_ation');
                return;
            }

            if (result.length > 0) {
                // db.query('select * from book_tour where user_id = ? and tour_id = ?', [data_id, req_loc_id], async (err, booked_trip_res) => {
                db.query('select * from book_tour where user_id = ? and tour_id = ?', [data_id, req_loc_id], async (err, booked_trip_res) => {
                    if (err) {
                        console.log('Error in checking booked details');
                        return;
                    }

                    if (booked_trip_res.length > 0) {
                        // console.log('already added to trip');
                        res.render('tour_page', {
                            user_loggedIn : data_id,
                            tour_res: result[0],
                            message: 'Already added to trip',
                            
                        });
                    } else {
                        console.log('book now');
                        res.render('tour_page', {
                            user_loggedIn : data_id,
                            tour_res: result[0],
                            message: '',
                            
                        });
                    }
                });
            } else {
                res.sendStatus(404);
                return;
            }
        });
    } else {
        const loc_data = 'select * from tour where tour_id = ?';
        const req_loc_id = req.query.locationid;
        if (req_loc_id === undefined || req_loc_id === null || req_loc_id === '') {
            res.sendStatus(404);
            return;
        }

        db.query(loc_data, [req_loc_id], async (err, result) => {
            if (err) {
                console.log('Error in fetching details of preferred location');
                return;
            }

            if (result.length > 0) {
                res.render('tour_page', {
                    user_loggedIn : '',
                    tour_res: result[0],
                    message : ''
                });
            } else {
                res.sendStatus(404);
                return;
            }
        });
    }
});


// RENDER EXCURSIONS WEBPAGE FOR BOOKING

explore.get('/excursions', async (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (loggedIn) {
        const data_id = req.session.user;
        
        const req_loc_id = req.query.locationid;
        
        if (req_loc_id === undefined || req_loc_id === null || req_loc_id === '') {
            res.sendStatus(404);
            return;
        }

        const loc_data = 'select * from excursions where tour_id = ?';
        
        db.query(loc_data, [req_loc_id], async (err, result) => {
            if (err) {
                console.log('Error in fetching details of preferred location');
                return;
            }
            
            if (result.length > 0) {
                db.query('select * from book_tour where user_id = ? and excursion_id = ?', [data_id, req_loc_id], async (err, booked_trip_res) => {
                    if (err) {
                        console.log('Error in checking booked details');
                        return;
                    }
                    
                    if (booked_trip_res.length > 0) {
                        // console.log('already added to trip');
                        res.render('excursion_page', {
                            user_loggedIn : data_id,
                            tour_res: result[0],
                            message: 'Already added to trip',
                            
                        });
                    } else {
                        console.log('book now');
                        res.render('excursion_page', {
                            user_loggedIn : data_id,
                            tour_res: result[0],
                            message: '',
                            
                        });
                    }
                });
            } else {
                res.sendStatus(404);
                return;
            }
        });
    } else {
        const loc_data = 'select * from excursions where tour_id = ?';
        const req_loc_id = req.query.locationid;
        if (req_loc_id === undefined || req_loc_id === null || req_loc_id === '') {
            res.sendStatus(404);
            return;
        }
        
        db.query(loc_data, [req_loc_id], async (err, result) => {
            if (err) {
                console.log('Error in fetching details of preferred location');
                return;
            }
            
            if (result.length > 0) {
                res.render('excursion_page', {
                    user_loggedIn : '',
                    tour_res: result[0],
                    message : ''
                });
            } else {
                res.sendStatus(404);
                return;
            }
        });
    }
});


// RENDER HOTELS WEBPAGE FOR BOOKING
explore.get('/hotels', async (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (loggedIn) {
        const data_id = req.session.user;
        const req_hotel_id = req.query.hotelid;

        if (req_hotel_id === undefined || req_hotel_id === null || req_hotel_id === '') {
            res.sendStatus(404);
            return;
        }

        const hotel_data = 'select * from hotels where hotel_id = ?';

        db.query(hotel_data, [req_hotel_id], async (err, result) => {
            if (err) {
                console.log('Error in fetching details of preferred hotel');
                return;
            }

            if (result.length > 0) {
                db.query('select * from book_tour where user_id = ? and tour_id = ?', [data_id, req_hotel_id], async (err, booked_trip_res) => {
                    if (err) {
                        console.log('Error in checking booked details');
                        return;
                    }

                    if (booked_trip_res.length > 0) {
                        // console.log('already added to trip');
                        res.render('hotel_page', {
                            user_loggedIn : data_id,
                            tour_res: result[0],
                            message: 'Already added to trip',
                        });
                    } else {
                        console.log('book now');
                        res.render('hotel_page', {
                            user_loggedIn : data_id,
                            tour_res: result[0],
                            message: '',
                            
                        });
                    }
                });
            } else {
                res.sendStatus(404);
                return;
            }
        });
    } else {
        const loc_data = 'select * from hotels where hotel_id = ?';
        const req_hotel_id = req.query.hotelid;
        if (req_hotel_id === undefined || req_hotel_id === null || req_hotel_id === '') {
            res.sendStatus(404);
            return;
        }

        db.query(loc_data, [req_hotel_id], async (err, result) => {
            if (err) {
                console.log('Error in fetching details of preferred hotel');
                return;
            }

            if (result.length > 0) {
                res.render('hotel_page', {
                    user_loggedIn : '',
                    tour_res: result[0],
                    message : ''
                });
            } else {
                res.sendStatus(404);
                return;
            }
        });
    }
});


// RENDER TRANSPORT WEBPAGE FOR BOOKING
explore.get('/transport', async (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (loggedIn) {
        const data_id = req.session.user;

        const req_mode = req.query.mode;
        // console.log(req_mode);

        if (req_mode === undefined || req_mode === null || req_mode === '') {
            res.sendStatus(404);
            return;
        }

        const loc_data = 'select * from transport where transport_id = ?';

        db.query(loc_data, [req_mode], async (err, result) => {
            if (err) {
                console.log('Error in fetching details of preferred location');
                return;
            }

            if (result.length > 0) {
                db.query('select * from book_tour where user_id = ? and tour_id = ?', [data_id, req_mode], async (err, booked_trip_res) => {
                    if (err) {
                        console.log('Error in checking booked details');
                        return;
                    }

                    if (booked_trip_res.length > 0) {
                        // console.log('already added to trip');
                        res.render('transport_page', {
                            user_loggedIn : data_id,
                            tour_res: result[0],
                            message: 'Already added to trip',
                            
                        });
                    } else {
                        console.log('book now');
                        res.render('transport_page', {
                            user_loggedIn : data_id,
                            tour_res: result[0],
                            message: '',
                            
                        });
                    }
                });
            } else {
                res.sendStatus(404);
                return;
            }
        });
    } else {
        const loc_data = 'select * from book_tour where user_id = ? and transport_id = ?';
        const req_mode = req.query.mode;
        if (req_mode === undefined || req_mode === null || req_mode === '') {
            res.sendStatus(404);
            return;
        }

        db.query(loc_data, [req_mode], async (err, result) => {
            if (err) {
                console.log('Error in fetching details of preferred location');
                return;
            }

            if (result.length > 0) {
                res.render('transport_page', {
                    user_loggedIn : '',
                    tour_res: result[0],
                    message : ''
                });
            } else {
                res.sendStatus(404);
                return;
            }
        });
    }
});

module.exports = explore;