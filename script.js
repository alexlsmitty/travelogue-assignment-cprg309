//Coordinating the map and the list of trips
//Coordinates for Calgary and our destinations:
const locations = {
    calgary: [51.0447, -114.0719],
    boraBora: [-16.5004, -151.7415],
    sanFrancisco: [37.7749, -122.4194],
    amsterdam: [52.3676, 4.9041],
}

// Initializing the map centered on Calgary
const map = L.map('map').setView(locations.calgary, 4);

// Adding the tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Adding markers for each location
const markers = [
    { name: 'Calgary, AB', coords: locations.calgary },
    { name: 'Bora Bora, French Polynesia', coords: locations.boraBora },
    { name: 'San Francisco, CA', coords: locations.sanFrancisco },
    { name: 'Amsterdam, The Netherlands', coords: locations.amsterdam },
];

// Adding markers to the map
markers.forEach((marker) => {
    L.marker(marker.coords)
        .addTo(map)
        .bindPopup(`<b>${marker.name}</b>`);
});

// Drawing lines between the markers
const flightPaths = [
    { from: locations.calgary, to: locations.boraBora },
    { from: locations.calgary, to: locations.sanFrancisco },
    { from: locations.calgary, to: locations.amsterdam },
];

// Adding the lines to the map
flightPaths.forEach((path) => {
    L.polyline([path.from, path.to], {
        color: 'red',
        weight: 2,
        opacity: 0.8,
        dashArray: '5, 5',
    }).addTo(map);
});

//Function for handling image and caption handling
function setupImageSwapping() {
    const images = document.querySelectorAll('.trip-image img');

    images.forEach((image) => {
        image.addEventListener('click', () => {
            const currentSrc = image.src;
            console.log(currentSrc);
            const baseName = currentSrc.substring(0, currentSrc.length - 5);
            const currentNumber = parseInt(currentSrc.match(/(\d+)\.jpg$/)[1], 10);
            const nextNumber = currentNumber === 3 ? 1 : currentNumber + 1; 
            // Obtains the name of the src,
            // extracts the number, increments it and sets it to the next image

            image.src = `${baseName}${nextNumber}.jpg`;

            // Updating the caption for the image
            const captions = image.dataset.captions.split('|'); // Splitting the captions by the pipe character 
            const captionElement = image.nextElementSibling;
            captionElement.textContent = captions[nextNumber - 1];
        });
    });
}

//Function for updating countdown timers
function updateCountdowns() {
    const countdownElements = document.querySelectorAll('.countdown-timer');

    countdownElements.forEach((element) => {
        const targetDate = new Date(element.dataset.date);
        const now = new Date();
        const timeRemaining = targetDate - now;

        console.log(timeRemaining);
        if (timeRemaining > 0) {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            element.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            element.textContent = 'Trip Started!!';
        }
    });
}

// Call the function to update countdowns
setInterval(updateCountdowns, 1000);

// Initial call for setting the timers immediately upon page load
updateCountdowns();
setupImageSwapping();