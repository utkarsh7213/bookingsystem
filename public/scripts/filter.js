
// FILTER BY HOURS
let trip_duration_val = new Set(); // Using a Set to store selected trip levels

function filterTripDuration(elem) {
    let dest_duration = document.querySelectorAll('.destination');
    let trip_duration_value = elem.getAttribute('data-duration');

    if (trip_duration_val.has(trip_duration_value)) {
        trip_duration_val.delete(trip_duration_value);
        elem.querySelector('input').checked = false; // Uncheck the checkbox
        filter = true;
    } else {
        trip_duration_val.add(trip_duration_value);
        elem.querySelector('input').checked = true; // Check the checkbox
        filter = true;
    }

    dest_duration.forEach((destination_values) => {
        let data_duration = destination_values.getAttribute('data-duration');
        if (trip_duration_val.size === 0 || trip_duration_val.has(data_duration)) {
            destination_values.style.display = 'block'; // Show the destination element
        } else {
            destination_values.style.display = 'none'; // Hide the destination element
        }
    });
}

// FILTER BY TRIP LEVEL
let trip_level_val = [];

function filterTripLevel(elem) {
    let dest_trip_level = document.querySelectorAll('.destination');
    let trip_level_value = elem.getAttribute('data-level');
    let index = trip_level_val.indexOf(trip_level_value);

    if (index !== -1) {
        trip_level_val.splice(index, 1);
        elem.querySelector('input').checked = false; // Uncheck the checkbox
        filter = true
    } else {
        trip_level_val.push(trip_level_value);
        elem.querySelector('input').checked = true; // Check the checkbox
        filter = true
    }

    dest_trip_level.forEach((destination_values) => {
        let data_level = destination_values.getAttribute('data-level');
        let dataLevelArray = data_level.split(', '); // Split data_amenities by comma

        let shouldShow = trip_level_val.every(value => dataLevelArray.includes(value.trim())); // Trim whitespace

        if (shouldShow) {
            destination_values.style.display = 'block'; // Show the destination element
            // console.log(data_level);
        } else {
            destination_values.style.display = 'none'; // Hide the destination element
        }
    });
}

// FILTER BY MONTHS
let values = [];

function filterMonths(elem) {
    let destination_data = document.querySelectorAll('.destination');
    let month_value = elem.getAttribute('data-month');
    let index = values.indexOf(month_value);

    if (index !== -1) {
        values.splice(index, 1);
        elem.querySelector('input').checked = false; // Uncheck the checkbox
        filter = true
    } else {
        values.push(month_value);
        elem.querySelector('input').checked = true; // Check the checkbox
        filter = true
    }

    destination_data.forEach((destination_values) => {
        let data_month = destination_values.getAttribute('data-month');
        let dataMonthsArray = data_month.split(', '); // Split data_amenities by comma

        let shouldShow = values.every(value => dataMonthsArray.includes(value.trim())); // Trim whitespace

        if (shouldShow) {
            destination_values.style.display = 'block'; // Show the destination element
            // console.log(data_month);
        } else {
            destination_values.style.display = 'none'; // Hide the destination element
        }
    });
}

// FILTER BY TRIP TYPE
let trip_type_val = [];

function filterTripType(elem) {
    let dest_trip_type = document.querySelectorAll('.destination');
    let trip_type_value = elem.getAttribute('data-type');
    let index = trip_type_val.indexOf(trip_type_value);

    if (index !== -1) {
        trip_type_val.splice(index, 1);
        elem.querySelector('input').checked = false; // Uncheck the checkbox
        filter = true
    } else {
        trip_type_val.push(trip_type_value);
        elem.querySelector('input').checked = true; // Check the checkbox
        filter = true
    }

    dest_trip_type.forEach((destination_values) => {
        let data_type = destination_values.getAttribute('data-type');
        let dataTypeArray = data_type.split(', '); // Split data_amenities by comma

        let shouldShow = trip_type_val.every(value => dataTypeArray.includes(value.trim())); // Trim whitespace

        if (shouldShow) {
            destination_values.style.display = 'block'; // Show the destination element
            // console.log(data_type);
        } else {
            destination_values.style.display = 'none'; // Hide the destination element
        }
    });
}


// FILTER BY Price Between
let trip_price_bet_val = new Set(); // Using a Set to store selected trip levels

function filterTripsByPrice(elem) {
    let dest_price = document.querySelectorAll('.destination');
    let trip_price_value = elem.getAttribute('data-price');

    if (trip_price_bet_val.has(trip_price_value)) {
        trip_price_bet_val.delete(trip_price_value);
        elem.querySelector('input').checked = false; // Uncheck the checkbox
        filter = true;
    } else {
        trip_price_bet_val.add(trip_price_value);
        elem.querySelector('input').checked = true; // Check the checkbox
        filter = true;
    }

    dest_price.forEach((destination_values) => {
        let data_price = destination_values.getAttribute('data-price');
        if (trip_price_bet_val.size === 0 || trip_price_bet_val.has(data_price)) {
            destination_values.style.display = 'block'; // Show the destination element
        } else {
            destination_values.style.display = 'none'; // Hide the destination element
        }
    });
}
