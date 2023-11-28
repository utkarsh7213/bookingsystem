function filterDateRange(element) {
    const datePickInputId = element.getAttribute('data-datepick');
    const dateInput = document.getElementById(datePickInputId);
    // console.log(dateInput.value);
}


function filterDestinations(element, filterType) {
    filter = true;
    const filterValue = element.getAttribute(`data-${filterType}`);
    const radioBtn = element.querySelector('.filter-option');
    radioBtn.checked = true;

    const destinations = document.querySelectorAll('.destination');
    destinations.forEach(card => {
        const cardValue = card.getAttribute(`data-${filterType}`);
        const showCard = (cardValue == filterValue);
        card.style.display = showCard ? "block" : "none";
    });
}

function filterByPopular(element) {
    filterDestinations(element, 'popular');
}

function filterAccessLevel(element) {
    filterDestinations(element, 'access');
}

function filterTripDollar(element) {
    filterDestinations(element, 'dollar');
}

function filterTripStar(element) {
    filterDestinations(element, 'star');
}
