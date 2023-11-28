function collectCardData() {
    const queries = [
        { property: 'location', selector: 'h4' },
        { property: 'totalCount', selector: '.totalCount' },
        { property: 'cardText', selector: '.card-text' },
        { property: 'additionalInfo', selector: '.card-content p:last-child' },
        { property: 'price', selector: '.price' },
        { property: 'time', selector: '.time' },
    ];

    const cardElements = document.querySelectorAll('.card');
    const cardDataArray = [];

    cardElements.forEach((cardElement, index) => {
        const cardData = {};

        queries.forEach(query => {
            const element = cardElement.querySelector(query.selector);
            if (element) {
                cardData[query.property] = element.textContent;
            }
        });

        // const roomTypeCheckboxes = cardElement.querySelectorAll('input[name^="room_type_"]:checked');
        // const bedTypeCheckboxes = cardElement.querySelectorAll('input[name^="bed_type_"]:checked');

        // const roomTypeValues = Array.from(roomTypeCheckboxes).map(checkbox => checkbox.value);
        // const bedTypeValues = Array.from(bedTypeCheckboxes).map(checkbox => checkbox.value);

        // // Add room type and bed type data to cardData
        // cardData.roomType = roomTypeValues.join(',');
        // cardData.bedType = bedTypeValues.join(',');

        cardDataArray.push(cardData);
    });

    // Log the pushed data
    // console.log(cardDataArray);

    return cardDataArray;  
}



const trip_btn = document.getElementById('addtrip');
trip_btn.addEventListener('click', (event) => {
    const datePickerInput = document.getElementById("datepicker_input");
    const dateValue = datePickerInput.value.trim();

    const date_pattern = /^\d{2} (January|February|March|April|May|June|July|August|September|October|November|December) \d{4}$/;

    if (totalCount > 0 && dateValue.trim() !== '' && date_pattern.test(dateValue)) {
        const cardDataArray = collectCardData();

        // Collect the selected checkbox values for room type
        const roomTypeCheckboxes = document.querySelectorAll('input[name="room_type_"]:checked');
        const selectedRoomTypes = Array.from(roomTypeCheckboxes).map(checkbox => checkbox.value);

        // Collect the selected checkbox values for bed type
        const bedTypeCheckboxes = document.querySelectorAll('input[name="bed_type_"]:checked');
        const selectedBedTypes = Array.from(bedTypeCheckboxes).map(checkbox => checkbox.value);

        const jsonData = {
            cardDataArray: cardDataArray,
            date: dateValue,
            roomTypes: selectedRoomTypes,
            bedTypes: selectedBedTypes
        };

        // console.log(jsonData); // Debugging: Log the JSON object to the console

        fetch('/add_hotel_trip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.login_popup) {
                window.location.href = '/login';
            } else {
                window.location.href = '/profile/mytrip_edit';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

        // alert('Welcome');
    } else {
        alert('Details are missing');
    }

    event.preventDefault();
});



















// const trip_btn = document.getElementById('addtrip');
// trip_btn.addEventListener('click', (event) => {

//     const datePickerInput = document.getElementById("datepicker_input");
//     // console.log(totalCount + ' ' + datePickerInput.value);
//     let customSelect = document.querySelector('.custom-select');
//     customSelect.classList.remove('active');
//     const dateValue = datePickerInput.value.trim();

//     const date_pattern = /^\d{2} (January|February|March|April|May|June|July|August|September|October|November|December) \d{4}$/;

//     if (totalCount > 0 && dateValue.trim() !== '' && date_pattern.test(dateValue)) {
//         const cardDataArray = collectCardData();
//         const jsonData = JSON.stringify(cardDataArray);

//         console.log(cardDataArray);
//         fetch('/add_hotel_trip', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: jsonData
//         })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.login_popup) {
//                     window.location.href = '/login';
//                 } else {
//                     window.location.href = '/profile/mytrip_edit';
//                 }
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//             });
//         alert('welcome')
//         // event.preventDefault();
//     }
//     else {
//         alert('details missing')
//         event.preventDefault()
//     }
//     event.preventDefault();
// })


