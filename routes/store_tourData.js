const db = require('../db');
const express = require('express');
const trip_data = express.Router();

trip_data.post('/:id', async (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (loggedIn) {
        const data_id = req.session.user;
        const user_trip_data = req.body;

        // console.log(user_trip_data);

        const tour_id = req.params.id;
        const firstObject = user_trip_data.cardDataArray[0];
        const totalCountString = firstObject.totalCount;
        const categories = ["Seniors", "Youths", "Children", "Adults", "Infants"];
        const categoryInfo = {};

        for (const category of categories) {
            const regex = new RegExp(`(\\d+) ${category} x HK\\$(\\d+)`, 'g');
            let match;

            while ((match = regex.exec(totalCountString)) !== null) {
                const quantity = parseInt(match[1]);
                const price = parseInt(match[2]);

                if (categoryInfo[category]) {
                    categoryInfo[category].quantity += quantity;
                    categoryInfo[category].price += quantity * price;
                } else {
                    categoryInfo[category] = { quantity, price: quantity * price };
                }
            }
        }

        const numericValues = firstObject.price.match(/\d+/g);
        const cost = parseFloat(numericValues);

        db.query('select * from tour where tour_id = ?', [tour_id], async (err, result) => {
            if (err) {
                console.log('Error in retrieving tour results');
                return;
            }

            const insert_trip_info = `insert into book_tour(
                user_id, title, loc_ation, des_cription, total_charges, booked_date, tour_id,
                senior_charges, youth_charges, children_charges, adult_charges, infant_charges, 
                seniors_quantity, youths_quantity, infants_quantity, children_quantity, adults_quantity,
                charges, travel_time, typ_e, available_lang
                ) values(
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                    )`;

            db.query(
                insert_trip_info,
                [
                    data_id,
                    result[0].title,
                    result[0].loc_ation,
                    result[0].des_cription,
                    cost,
                    firstObject.time,
                    tour_id,
                    result[0].senior_per_charge,
                    result[0].youth_per_charge,
                    result[0].children_per_charge,
                    result[0].adult_per_charge,
                    result[0].infant_per_charge,
                    categoryInfo["Seniors"] ? categoryInfo["Seniors"].quantity : 0,
                    categoryInfo["Youths"] ? categoryInfo["Youths"].quantity : 0,
                    categoryInfo["Infants"] ? categoryInfo["Infants"].quantity : 0,
                    categoryInfo["Children"] ? categoryInfo["Children"].quantity : 0,
                    categoryInfo["Adults"] ? categoryInfo["Adults"].quantity : 0,
                    result[0].charges,
                    result[0].travel_time,
                    result[0].typ_e,
                    result[0].available_lang,
                ],
                async (err, rows) => {
                    if (err) {
                        res.send('Error while adding tour to Trip');
                        return;
                    }
                    await res.json({ message: 'Trip booked successfully!' });
                }
            );
        });
    } else {
        await res.json({
            login_popup: 'Please login'
        });
    }
});


// Store excursions booking details in the database

trip_data.post('/excursion/:id', async (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (loggedIn) {
        const data_id = req.session.user;
        const user_trip_data = req.body;

        // console.log(user_trip_data);

        const tour_id = req.params.id;
        const firstObject = user_trip_data.cardDataArray[0];
        const totalCountString = firstObject.totalCount;
        const categories = ["Seniors", "Youths", "Children", "Adults", "Infants"];
        const categoryInfo = {};

        for (const category of categories) {
            const regex = new RegExp(`(\\d+) ${category} x HK\\$(\\d+)`, 'g');
            let match;

            while ((match = regex.exec(totalCountString)) !== null) {
                const quantity = parseInt(match[1]);
                const price = parseInt(match[2]);

                if (categoryInfo[category]) {
                    categoryInfo[category].quantity += quantity;
                    categoryInfo[category].price += quantity * price;
                } else {
                    categoryInfo[category] = { quantity, price: quantity * price };
                }
            }
        }

        const numericValues = firstObject.price.match(/\d+/g);
        const cost = parseFloat(numericValues);

        db.query('select * from excursions where tour_id = ?', [tour_id], async (err, result) => {
            if (err) {
                console.log('Error in retrieving excursion results');
                return;
            }

            const insert_trip_info = `insert into book_tour(
                user_id, title, loc_ation, des_cription, total_charges, booked_date, excursion_id,
                senior_charges, youth_charges, children_charges, adult_charges, infant_charges, 
                seniors_quantity, youths_quantity, infants_quantity, children_quantity, adults_quantity,
                charges, travel_time, typ_e, available_lang
                ) values(
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                    )`;

            db.query(
                insert_trip_info,
                [
                    data_id,
                    result[0].title,
                    result[0].loc_ation,
                    result[0].des_cription,
                    cost,
                    firstObject.time,
                    tour_id,
                    result[0].senior_per_charge,
                    result[0].youth_per_charge,
                    result[0].children_per_charge,
                    result[0].adult_per_charge,
                    result[0].infant_per_charge,
                    categoryInfo["Seniors"] ? categoryInfo["Seniors"].quantity : 0,
                    categoryInfo["Youths"] ? categoryInfo["Youths"].quantity : 0,
                    categoryInfo["Infants"] ? categoryInfo["Infants"].quantity : 0,
                    categoryInfo["Children"] ? categoryInfo["Children"].quantity : 0,
                    categoryInfo["Adults"] ? categoryInfo["Adults"].quantity : 0,
                    result[0].charges,
                    result[0].travel_time,
                    result[0].typ_e,
                    result[0].available_lang,
                ],
                async (err, rows) => {
                    if (err) {
                        res.send('Error while adding tour to Trip');
                        return;
                    }
                    await res.json({ message: 'Trip booked successfully!' });
                }
            );
        });
    } else {
        await res.json({
            login_popup: 'Please login'
        });
    }
});

module.exports = trip_data;
