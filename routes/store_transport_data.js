const db = require('../db');
const express = require('express');
const trip_data = express.Router();

trip_data.post('/', async (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (loggedIn) {
        const data_id = req.session.user;
        const user_trip_data = req.body;

        const firstObject = user_trip_data[0];
        
        const totalCountString = firstObject.totalCount;
        const categories = {};
        totalCountString.match(/(\w+):\s(\d+)/g).forEach(match => {
            const [category, count] = match.split(': ');
            categories[category] = parseInt(count);
        });
        
        const numericValues = user_trip_data[0].price.match(/\d+/g);
        const cost = parseFloat(numericValues);
        
        console.log(user_trip_data);
        const insert_trip_info = `insert into book_tour(loc, user_id, seniors, youths, childrens, adults, infants, location_desc, price, time_zone) values('${user_trip_data[0].location}', ?, ?, ?, ?, ?, ?, ?, ${cost}, '${user_trip_data[0].time}')`;

        db.query(insert_trip_info, [data_id, categories.Youths, categories.Seniors, categories.Children, categories.Adults, categories.Infants, user_trip_data[0].cardText, user_trip_data[0].time], async (err, result) => {
            if (err) {
                console.log('Error in storing trip data in the database');
                return;
            }
            res.json({ message: 'Trip booked successfully!' });
        });
    } else {
        res.json({
            login_popup: 'Please login'
        });
    }
});

module.exports = trip_data;