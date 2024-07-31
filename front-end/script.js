class MovieApp {
    constructor() {
        this.typeFilter = document.getElementById('type-filter');
        this.genreFilter = document.getElementById('genre-filter');
        this.ratingFilter = document.getElementById('rating-filter');
        this.searchInput = document.getElementById('search-input');
        this.comedyList = document.getElementById('comedy-list');
        this.actionList = document.getElementById('action-list');
        this.dramaList = document.getElementById('drama-list');
        this.popup = document.getElementById('popup');
        this.popupImg = document.getElementById('popup-img');
        this.popupTitle = document.getElementById('popup-title');
        this.popupType = document.getElementById('popup-type');
        this.popupGenre = document.getElementById('popup-genre');
        this.popupRating = document.getElementById('popup-rating');
        this.popupDesc = document.getElementById('popup-desc');
        this.closeBtn = document.querySelector('.close-btn');
        this.searchResultsContainer = document.createElement('div');
        this.searchResultsContainer.classList.add('movie-grid');
        this.container = document.querySelector('.container');

        this.addEventListeners();
        this.fetchMovies();
    }

    showMovieDetails(movie) {
        this.popupTitle.textContent = movie.title;
        this.popupType.textContent = `Type: ${movie.type}`;
        this.popupGenre.textContent = `Genre: ${movie.genre}`;
        this.popupRating.textContent = `Rating: ${movie.rating}`;
        this.popupDesc.textContent = `Description: ${movie.description}`;
        this.popupImg.src = movie.img;

        // Reset the popup state and animation
        this.popup.classList.remove('popup-reset');
        this.popup.style.display = 'flex';
        this.popup.style.opacity = '1';
        this.popup.style.visibility = 'visible';

        // Apply the open animation
        void this.popup.offsetWidth; // Trigger reflow
        this.popup.style.animation = 'popupAnimation 0.3s ease-out';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    closePopup() {
        this.popup.style.animation = 'popupCloseAnimation 0.3s ease-out';
        this.popup.classList.add('popup-reset');

        setTimeout(() => {
            this.popup.style.display = 'none';
            this.popup.style.opacity = '0';
            this.popup.style.visibility = 'hidden';
            document.body.style.overflow = ''; // Restore scrolling
        }, 300); // Duration of the animation
    }

    addEventListeners() {
        this.typeFilter.addEventListener('change', () => this.fetchMovies());
        this.genreFilter.addEventListener('change', () => this.fetchMovies());
        this.ratingFilter.addEventListener('change', () => this.fetchMovies());
        this.searchInput.addEventListener('input', () => this.fetchMovies());
        this.closeBtn.addEventListener('click', () => this.closePopup());

        window.addEventListener('click', (event) => {
            if (event.target === this.popup) {
                this.closePopup();
            }
        });
    }

    async fetchMovies() {
        const selectedType = this.typeFilter.value;
        const selectedGenre = this.genreFilter.value;
        const selectedRating = this.ratingFilter.value;
        const searchText = this.searchInput.value.toLowerCase();

        const queryParams = new URLSearchParams();
        if (selectedType) queryParams.append('type', selectedType);
        if (selectedGenre) queryParams.append('genre', selectedGenre);
        if (selectedRating) queryParams.append('minRating', selectedRating);
        if (searchText) queryParams.append('title', searchText);

        const response = await fetch(`http://localhost:2030/films/search?${queryParams.toString()}`);
        const movies = await response.json();

        if (searchText) {
            this.renderSearchResults(movies);
        } else {
            this.renderMovies(movies);
        }
    }

    renderMovies(movies) {
        const filteredComedies = movies.filter(movie => movie.genre === 'Comedy');
        const filteredActions = movies.filter(movie => movie.genre === 'Action');
        const filteredDramas = movies.filter(movie => movie.genre === 'Drama');

        this.renderMovieList(filteredComedies, this.comedyList);
        this.renderMovieList(filteredActions, this.actionList);
        this.renderMovieList(filteredDramas, this.dramaList);
    }

    renderSearchResults(movies) {
        this.clearMovieLists();
        this.renderMovieList(movies, this.searchResultsContainer);
        if (this.container && !this.container.contains(this.searchResultsContainer)) {
            this.container.appendChild(this.searchResultsContainer);
        }
    }

    renderMovieList(filteredMovies, container) {
        container.innerHTML = '';
        filteredMovies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.addEventListener('click', () => this.showMovieDetails(movie));

            const img = document.createElement('img');
            img.src = movie.img;
            movieCard.appendChild(img);

            const info = document.createElement('div');
            info.classList.add('movie-info');

            const title = document.createElement('h3');
            title.textContent = movie.title;
            info.appendChild(title);

            const genre = document.createElement('p');
            genre.textContent = `Genre: ${movie.genre}`;
            info.appendChild(genre);

            const duration = document.createElement('p');
            duration.textContent = `Duration: ${movie.duration}`;
            info.appendChild(duration);

            const rating = document.createElement('p');
            rating.textContent = `Rating: ${movie.rating}`;
            info.appendChild(rating);

            movieCard.appendChild(info);
            container.appendChild(movieCard);
        });
    }

    clearMovieLists() {
        if (this.comedyList) this.comedyList.innerHTML = '';
        if (this.actionList) this.actionList.innerHTML = '';
        if (this.dramaList) this.dramaList.innerHTML = '';
        if (this.container && this.searchResultsContainer) {
            if (this.container.contains(this.searchResultsContainer)) {
                this.container.removeChild(this.searchResultsContainer);
            }
        }
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new MovieApp();
});
