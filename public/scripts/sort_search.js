const searchInput = document.getElementById('search_keywords');

searchInput.addEventListener('input', performSearch);


function performSearch() {
    const query = searchInput.value.toLowerCase();
    const searchableDestination = document.querySelectorAll('.destination');

    searchableDestination.forEach(element => {
        element.style.display = 'none';
    });

    searchableDestination.forEach(element => {
        const dataDestination = element.getAttribute('data-destination').toLowerCase();
        if (dataDestination.startsWith(query)) {
            element.style.display = 'block';
        }
    });
}