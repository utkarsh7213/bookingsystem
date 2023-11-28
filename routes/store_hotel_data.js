const db = require('../db');
const express = require('express');
const trip_data = express.Router();

trip_data.post('/', async (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (loggedIn) {
        const data_id = req.session.user;
        const user_trip_data = req.body;

        // console.log(user_trip_data);
        let array_values = user_trip_data.cardDataArray[0];

        const totalCountString = array_values.totalCount;
        const categories = {};

        totalCountString.match(/(\w+):\s(\d+)/g).forEach(match => {
            const [category, count] = match.split(': ');
            categories[category] = parseInt(count);
        });

        const numericValues = array_values.price.match(/\d+/g);
        const cost = parseFloat(numericValues);

        const jsonData = {
            loc: array_values.location,
            user_id: data_id,
            seniors: categories.Seniors,
            youths: categories.Youths,
            childrens: categories.Children,
            adults: categories.Adults,
            infants: categories.Infants,
            location_desc: array_values.cardText,
            price: cost,
            time_zone: array_values.time,
            room_type: user_trip_data.roomTypes.join(', '), // Convert roomTypes array to a comma-separated string
            bed_type: user_trip_data.bedTypes.join(', ') // Convert bedTypes array to a comma-separated string
        };

        console.log(jsonData);

        const insert_trip_info = `
            INSERT INTO book_tour (
                loc, user_id, seniors, youths, childrens, adults, infants, location_desc, price, time_zone,
                room_type, bed_type, booked_date
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        // Pass the JSON object's properties as an array of values to the database query
        db.query(insert_trip_info, [
            jsonData.loc,
            jsonData.user_id,
            jsonData.seniors,
            jsonData.youths,
            jsonData.childrens,
            jsonData.adults,
            jsonData.infants,
            jsonData.location_desc,
            jsonData.price,
            jsonData.time_zone,
            jsonData.room_type,
            jsonData.bed_type,
            user_trip_data.date
        ], async (err, result) => {
            if (err) {
                console.log('Error in storing trip data in the database');
                return res.status(500).json({ error: 'Error in storing trip data' });
            }
            return res.status(200).json({ message: 'Trip booked successfully!' });
        });
    } else {
        res.json({
            login_popup: 'Please login'
        });
    }
});

module.exports = trip_data;