
const urlParams = new URLSearchParams(window.location.search);
const movieID = urlParams.get('movieId');

const language = document.getElementById('lang');
const genre = document.getElementById('genre');
const summary = document.getElementById('summary')
const streaming = document.getElementById('streaming-details')
const moviePoster = document.getElementById('movie-img')
const movieHeader = document.getElementById('movie-header-name')



const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = 'd4548a42da69d5c734067c281381b8b8';
const imageBaseUrl = "https://image.tmdb.org/t/p/w300"

//function to get details for each movie
async function fetchMovieDetails() {
    const response = await fetch(`${apiBaseUrl}/movie/${movieID}?api_key=${apiKey}&append_to_response=images`);
    const jsonResponse = await response.json()
    const movie = jsonResponse
    console.log(movie)
    displayDetails(movie)
    
}

//function to display the movies in the dom
function displayDetails(movie) {
    if(movie.poster_path != null) {
        moviePoster.src = `${imageBaseUrl}${movie.poster_path}`;
    }
    else {
      
    }
    movieHeader.innerHTML = movie.original_title
    summary.innerHTML = movie.overview
    streaming.innerHTML = getWebsiteHostName(movie.homepage);

    let languageString = ""
    movie.spoken_languages.forEach(language => {
        languageString += language.english_name + " "
    });
    language.innerHTML = languageString

    let genreString = ""
    movie.genres.forEach(genre => {
       genreString += genre.name + " "
    }); 
    genre.innerHTML = genreString
}

//function to extract the hostname from the website url
function getWebsiteHostName(link) {
   try{
    const url = new URL(link)
    return url.hostname
   } 
   catch {
    return ""
   }
}
fetchMovieDetails()
