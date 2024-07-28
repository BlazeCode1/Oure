document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('searchForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Get input values
        const title = document.getElementById('title').value.trim();
        const genre = document.getElementById('genre').value.trim();
        const type = document.getElementById('type').value.trim();
        const minRating = document.getElementById('minRating').value.trim();
        const maxRating = document.getElementById('maxRating').value.trim();

        // Build an object with only defined parameters
        const params = {
            ...(title && { title }), // Add title if it is not empty
            ...(genre && { genre }), // Add genre if it is not empty
            ...(type && { type }), // Add type if it is not empty
            ...(minRating && { minRating }), // Add minRating if it is not empty
            ...(maxRating && { maxRating }) // Add maxRating if it is not empty
        };

        // Convert the object to a query string
        const queryParams = new URLSearchParams(params).toString();

        const apiUrl = `http://localhost:2030/films/search?${queryParams}`;

        console.log(`Fetching data from: ${apiUrl}`); // Debugging line

        // Fetch data from the backend
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data received:', data); // Debugging line
                displayData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });
});

function displayData(films) {
    const contentDiv = document.getElementById('content');
    if (films.length === 0) {
        contentDiv.innerHTML = '<p>No results found.</p>';
    } else {
        contentDiv.innerHTML = films.map(film => `
            
            <div class="item">
            <img src="${film.img}" width="340" height="490" style="display:flex, align-item:left"></img>
                <h2>${film.title}</h2>
                <p>Genre: ${film.genre}</p>
                <p>Type: ${film.type}</p>
                <p>Rating: ${film.rating}</p>
            </div>
        `).join('');
    }
}
