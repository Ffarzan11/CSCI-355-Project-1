const search = document.querySelector('.search')
const btn = document.querySelector('.btn')
const input = document.querySelector('.input')
const searchInp = document.getElementById('search-input')
const searcbtn = document.getElementById('search-btn')
const moviesGrid = document.getElementById("movies-grid");
const categoryTitle = document.getElementById("category-title");
const carousel = document.getElementById('carousel')
const genreID = document.getElementById('genre-ID')
const actionBtn = document.getElementById('action')
const adventureBtn = document.getElementById('adventure')
const romanceBtn = document.getElementById('romance')
const thrillerBtn = document.getElementById('thriller')
const horrorBtn = document.getElementById('horror')
const comedyBtn = document.getElementById('comedy')



let counter = 1
setInterval(function () {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if (counter > 4) {
        counter = 1
    }
}, 3000);

//genre buttons
actionBtn.addEventListener('click', () => {
    let genreID = 28
    fetchPopularMovies(genreID)
    categoryTitle.innerHTML = "Popular in " + actionBtn.innerHTML
})
adventureBtn.addEventListener('click', () => {
    let genreID = 12
    fetchPopularMovies(genreID)
    categoryTitle.innerHTML = "Popular in " + adventureBtn.innerHTML
})
romanceBtn.addEventListener('click', () => {
    let genreID = 10749
    fetchPopularMovies(genreID)
    categoryTitle.innerHTML = "Popular in " + romanceBtn.innerHTML
})
thrillerBtn.addEventListener('click', () => {
    let genreID = 53
    fetchPopularMovies(genreID)
    categoryTitle.innerHTML = "Popular in " + thrillerBtn.innerHTML
})
comedyBtn.addEventListener('click', () => {
    fetchPopularMovies(genreID)
    categoryTitle.innerHTML = "Popular in " + comedyBtn.innerHTML
})
horrorBtn.addEventListener('click', () => {
    let genreID = 27
    fetchPopularMovies(genreID)
    categoryTitle.innerHTML = "Popular in " + horrorBtn.innerHTML
})

//search
btn.addEventListener('click', () => {
    if (search.classList.contains('active')) {
        if (searchInp.value != '') {
            categoryTitle.innerHTML = 'Search Results';
            searchMovies(searchInp.value)
            carousel.style.display = "none"
            genreID.style.display = "none"
        }
    }
    search.classList.toggle('active')

    input.focus()
})



const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = "d4548a42da69d5c734067c281381b8b8";
const imageBaseUrl = "https://image.tmdb.org/t/p/w300";



async function fetchMoviesNowPlaying() {
    const response = await fetch(`${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`);
    const jsonResponse = await response.json();
    const movies = jsonResponse.results;
    displayMovies(movies);

}

async function fetchPopularMovies(genreID) {
    const response = await fetch(`${apiBaseUrl}/movie/popular?api_key=${apiKey}`);
    const jsonResponse = await response.json();
    const movies = jsonResponse.results;
    displayGenreMovies(movies, genreID)
    //console.log(movies);
}

function displayGenreMovies(movies, genreID) {
    const genreMovies = movies.filter((movie) =>
        movie.genre_ids.includes(genreID));
    moviesGrid.innerHTML = genreMovies.map((movies) =>
        `<div class = 'movie-card' data-movie-id = "${movies.id}"> 
        <img src="${imageBaseUrl}${movies.poster_path}"/>
        <p class = "movie-name">${movies.title}</p>
        <p>Rating ⭐ ${movies.vote_average.toFixed(2)}</p>
    </div>`

    ).join("");
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => card.addEventListener('click', handleMovieClick));
}

//o  show the movies currently playing as a grid format
function displayMovies(movies) {
    moviesGrid.innerHTML = movies.map((movie) =>

        `<div class = 'movie-card' data-movie-id = "${movie.id}"> 
            <img src="${imageBaseUrl}${movie.poster_path}"/>
            <p class = "movie-name">${movie.title}</p>
            <p>Rating ⭐ ${movie.vote_average.toFixed(2)}</p>
        </div>`

    ).join("");

    //accessing each of the movie card and adding event listener
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => card.addEventListener('click', handleMovieClick));
}

function handleMovieClick(event) {
    const clickedMovieCard = event.currentTarget;
    //getting the movie id and appending it to the url
    const movieId = clickedMovieCard.dataset.movieId
    window.location.href = `movie_view.html?movieId=${movieId}`; //on clicking the movie it takes u to movie_view page
    return movieName
}

// when the user searchs display the movies that have what the user searched.
async function searchMovies(query) {
    const response = await fetch(`${apiBaseUrl}/search/movie?api_key=${apiKey}&query='${query}"`);
    const jsonResponse = await response.json();
    const movies = jsonResponse.results;
    displayMovies(movies);
}

fetchMoviesNowPlaying();