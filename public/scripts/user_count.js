const custom_select = document.querySelector('.custom-select');
let price_elem = document.getElementsByClassName('price')[0];

function handleClickOutside(event) {
	if (!custom_select.contains(event.target)) {
		// Clicked outside the custom_select, so remove the 'active' class
		custom_select.classList.remove('active');
	}
}

const totalCountElement = document.getElementsByClassName('totalCount');
let senior_price = 0;
let children_price = 0;
let adults_price = 0;
let youth_price = 0;
let infants_price = 0;
let total_count = 0;
let users = {};

let total_price = 0;

custom_select.addEventListener('click', (event) => {
	const contains_label = event.target.classList.contains('select-label');
	const contains_add = event.target.classList.contains('add');
	const contains_subtract = event.target.classList.contains('subtract');

	if (contains_label) {
		custom_select.classList.toggle('active');
	}
	else if (contains_add) {
		const count_elem = event.target.parentElement.querySelector('.count');
		let count = parseFloat(count_elem.textContent);

		if (count < 3) {
			count++;
			count_elem.textContent = count;
			total_count++;
			totalCountElement[0].textContent = total_count;

			const userTypeElement = event.target.parentElement.previousElementSibling;
			const userType = userTypeElement.textContent;

			// console.log(userTypeElement);

			if (userTypeElement.getAttribute('data-senior')) {
				let data_senior = userTypeElement.getAttribute('data-senior');
				senior_price = parseFloat(data_senior) + senior_price;
				total_price = parseFloat(data_senior) + total_price;
			}
			else if (userTypeElement.getAttribute('data-youth')) {
				let data_youth = userTypeElement.getAttribute('data-youth');
				youth_price = parseFloat(data_youth) + youth_price;
				total_price = parseFloat(data_youth) + total_price;
			}
			else if (userTypeElement.getAttribute('data-children')) {
				let data_children = userTypeElement.getAttribute('data-children');
				children_price = children_price + parseFloat(data_children);
				total_price = parseFloat(data_children) + total_price;
			}
			else if (userTypeElement.getAttribute('data-adults')) {
				let data_adults = userTypeElement.getAttribute('data-adults');
				adults_price = adults_price + parseFloat(data_adults);
				total_price = parseFloat(data_adults) + total_price;
			}
			else if (userTypeElement.getAttribute('data-infants')) {
				let data_infants = userTypeElement.getAttribute('data-infants');
				infants_price = infants_price + parseFloat(data_infants);
				total_price = parseFloat(data_infants) + total_price;
			}

			// console.log(total_price)
			if (!users[userType]) {
				users[userType] = 0;
			}

			users[userType]++;
			let totalTextCount = '';

			for (const userType in users) {
				if (users[userType] > 0) {
					totalTextCount += `, ${users[userType]} ${userType}`;
				}
			}
			totalCountElement[1].innerHTML = totalTextCount.substring(2);

			// console.log(totalTextCount)
		}
	}

	else if (contains_subtract) {
		const count_elem = event.target.parentElement.querySelector('.count');
		let count = parseFloat(count_elem.textContent);

		if (count > 0) {
			count--;
			count_elem.textContent = count;
			total_count--;
			totalCountElement[0].textContent = total_count;

			const userTypeElement = event.target.parentElement.previousElementSibling;
			const userType = userTypeElement.textContent;

			if (userTypeElement.getAttribute('data-senior')) {
				let data_senior = userTypeElement.getAttribute('data-senior');
				senior_price = senior_price - parseFloat(data_senior);
				total_price = total_price - parseFloat(data_senior);
			}
			else if (userTypeElement.getAttribute('data-youth')) {
				let data_youth = userTypeElement.getAttribute('data-youth');
				youth_price = youth_price - parseFloat(data_youth);
				total_price = total_price - parseFloat(data_youth);
			}
			else if (userTypeElement.getAttribute('data-children')) {
				let data_children = userTypeElement.getAttribute('data-children');
				children_price = children_price - parseFloat(data_children);
				total_price = total_price - parseFloat(data_children);
			}
			else if (userTypeElement.getAttribute('data-adults')) {
				let data_adults = userTypeElement.getAttribute('data-adults');
				adults_price = adults_price - parseFloat(data_adults);
				total_price = total_price - parseFloat(data_adults);
			}
			else if (userTypeElement.getAttribute('data-infants')) {
				let data_infants = userTypeElement.getAttribute('data-infants');
				infants_price = infants_price - parseFloat(data_infants);
				total_price = total_price - parseFloat(data_infants);
			}

			if (!users[userType]) {
				users[userType] = 0;
			}

			users[userType]--;
			let totalTextCount = '';

			for (const userType in users) {
				if (users[userType] > 0) {
					totalTextCount += `, ${users[userType]} ${userType}`;
				}
			}
			totalCountElement[1].innerHTML = totalTextCount.substring(2);
		}
	}

	price_elem.style.display = total_count > 0 ? 'block' : 'none';
	price_elem.textContent = "Total HK$" + total_price;

});

// Add a document-level click event listener to handle clicks outside
document.addEventListener('click', handleClickOutside);