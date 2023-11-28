let values = [];

function filterByAmenities(elem) {
    let destination_data = document.querySelectorAll('.destination');
    let amenities_value = elem.getAttribute('data-amenities');
    let index = values.indexOf(amenities_value);

    if (index !== -1) {
        values.splice(index, 1);
        elem.querySelector('input').checked = false; // Uncheck the checkbox
        filter = true
    } else {
        values.push(amenities_value);
        elem.querySelector('input').checked = true; // Check the checkbox
        filter = true
    }

    destination_data.forEach((destination_values) => {
        let data_amenities = destination_values.getAttribute('data-amenities');
        let dataAmenitiesArray = data_amenities.split(', '); // Split data_amenities by comma

        let shouldShow = values.every(value => dataAmenitiesArray.includes(value.trim())); // Trim whitespace

        if (shouldShow) {
            destination_values.style.display = 'block'; // Show the destination element
            // console.log(data_amenities);
        } else {
            destination_values.style.display = 'none'; // Hide the destination element
        }
    });
}

// FILTER BY POPULAR WITH
let popular_with = new Set(); // Using a Set to store selected trip levels

function filterByPopular(elem) {
    let dest = document.querySelectorAll('.destination');
    let data_popular = elem.getAttribute('data-popular');

    if (popular_with.has(data_popular)) {
        popular_with.delete(data_popular);
        elem.querySelector('input').checked = false; // Uncheck the checkbox
        filter = true;
    } else {
        popular_with.add(data_popular);
        elem.querySelector('input').checked = true; // Check the checkbox
        filter = true;
    }

    dest.forEach((destination_values) => {
        let data_val = destination_values.getAttribute('data-popular');
        if (popular_with.size === 0 || popular_with.has(data_val)) {
            destination_values.style.display = 'block'; // Show the destination element
        } else {
            destination_values.style.display = 'none'; // Hide the destination element
        }
    });
}

// FILTER BY RATINGS
let ratings_filter = new Set(); // Using a Set to store selected trip levels

function filterTripStar(elem) {
    let dest = document.querySelectorAll('.destination');
    let data_ratings = elem.getAttribute('data-star');

    if (ratings_filter.has(data_ratings)) {
        ratings_filter.delete(data_ratings);
        elem.querySelector('input').checked = false; // Uncheck the checkbox
        filter = true;
    } else {
        ratings_filter.add(data_ratings);
        elem.querySelector('input').checked = true; // Check the checkbox
        filter = true;
    }

    dest.forEach((destination_values) => {
        let data_val = destination_values.getAttribute('data-star');
        if (ratings_filter.size === 0 || ratings_filter.has(data_val)) {
            destination_values.style.display = 'block'; // Show the destination element
        } else {
            destination_values.style.display = 'none'; // Hide the destination element
        }
    });
}

// FILTER BY DOLLAR SIGN
let dollar_filter = new Set(); // Using a Set to store selected trip levels

function filterTripDollar(elem) {
    let dest = document.querySelectorAll('.destination');
    let data_dollar = elem.getAttribute('data-dollar');

    if (dollar_filter.has(data_dollar)) {
        dollar_filter.delete(data_dollar);
        elem.querySelector('input').checked = false; // Uncheck the checkbox
        filter = true;
    } else {
        dollar_filter.add(data_dollar);
        elem.querySelector('input').checked = true; // Check the checkbox
        filter = true;
    }

    dest.forEach((destination_values) => {
        let data_val = destination_values.getAttribute('data-dollar');
        if (dollar_filter.size === 0 || dollar_filter.has(data_val)) {
            destination_values.style.display = 'block'; // Show the destination element
        } else {
            destination_values.style.display = 'none'; // Hide the destination element
        }
    });
}
