const collectCardData = () => {
    const queries = [
      { property: 'location', selector: 'h4' },
      { property: 'totalCount', selector: '.totalCount' },
      { property: 'cardText', selector: '.card-text' },
      { property: 'price', selector: '.price' },
      { property: 'time', selector: '.time' },
    ];
  
    const cardElements = document.querySelectorAll('.card');
    const cardDataArray = [];
  
    cardElements.forEach((elem) => {
      const cardData = {};
  
      queries.forEach(query => {
        const element = elem.querySelector(query.selector);
  
        if (element) {
          cardData[query.property] = element.textContent;
        }
      });
  
      // Retrieve the totalPeople value
      let totalPeople = document.querySelector('.totalPeople').textContent;
  
      // Add totalPeople to the cardData object
      cardData.totalPeople = totalPeople;
  
      cardDataArray.push(cardData);
    });
  
    // console.log(cardDataArray);
    return cardDataArray;
  }


const trip_btn = document.getElementById('addtrip');
trip_btn.addEventListener('click', (event) => {

    const tour_id = event.target.getAttribute('data-tourid')

    const cardDataArray = collectCardData();
    const dateValue = cardDataArray[0].time;
    
    const date_pattern = /^\d{2} (January|February|March|April|May|June|July|August|September|October|November|December) \d{4}$/;

    if (cardDataArray[0].totalPeople > 0 && dateValue.trim() !== '' && date_pattern.test(dateValue)) {
        const cardDataArray = collectCardData();
        // const jsonData = JSON.stringify(cardDataArray);

        cardDataArray[0].totalCount = cardDataArray[0].totalCount.replace(/\s+/g, ' ').trim();

        // console.log(cardDataArray);
        const jsonData = {
            cardDataArray: cardDataArray,
        };

        fetch(`/add_trip/${tour_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.login_popup) {
                    document.getElementById('popup').style.display = 'block';

                } else {
                    window.location.href = '/profile/my_trips';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        // alert('welcome')
        event.preventDefault();
    }
    else {
        alert('Some details missing')
        event.preventDefault()
    }
    event.preventDefault();
})


