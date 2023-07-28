const global = {
    currentPage: window.location.pathname,
}

// Display 20 most popular movies
async function displayPopularMovies() {
    const {results} = await fetchAPIData('movie/popular');
    
    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
          <a href="/Projects/flixx-app/movie-details.html?id=${movie.id}">
            ${
                // Ternary if statement showing image if it is there and if not, show no image icon
                movie.poster_path?`<img
                src="https://images.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
              />` : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `;

        document.querySelector('#popular-movies').appendChild(div);
    })
}

// Display 20 most popular tv shows
async function displayPopularShows() {
    const {results} = await fetchAPIData('tv/popular');
    
    results.forEach(show => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
          <a href="/Projects/flixx-app/tv-details.html?id=${show.id}">
            ${
                // Ternary if statement showing image if it is there and if not, show no image icon
                show.poster_path?`<img
                src="https://images.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"
              />` : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${show.first_air_date}</small>
            </p>
          </div>
        `;

        document.querySelector('#popular-shows').appendChild(div);
    })
}

// Display movie details
async function displayMovieDetails(){
    const movieId = window.location.search.split('=')[1];

    const movie = await fetchAPIData(`movie/${movieId}`);

    const div = document.createElement('div');

    div.innerHTML = `<div class="details-top">
    <div>
    ${
        // Ternary if statement showing image if it is there and if not, show no image icon
        movie.poster_path?`<img
        src="https://images.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />` : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${movie.title}"
    />`
    }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        <li>${movie.genres[0].name}</li>
        <li>${movie.genres[1].name}</li>
        <li>${movie.genres[2].name}</li>
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> \$${movie.budget.toLocaleString()}</li>
      <li><span class="text-secondary">Revenue:</span> \$${movie.revenue.toLocaleString()}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
        ${movie.production_companies.map((company) => `<span>${company.name}</span>`).join(', ')}
    </div>
  </div>`;

  document.querySelector('#movie-details').appendChild(div);
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint){
    const API_KEY = '254c8da735e5e272fb7eaa7b1019fd61';
    const API_URL = 'https://api.themoviedb.org/3/';

    showSpinner();

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

    const data = await response.json();

    hideSpinner();

    return data;
}

// Show spinner function on every page

function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}


//Highlight active link
function highlightActiveLink(){
   const links = document.querySelectorAll('.nav-link');
   links.forEach((link) => {
    if(link.getAttribute('href') === global.currentPage){
        link.classList.add('active');
    }
   }) 
}

//Init App
function init(){
    switch(global.currentPage) {
        case '/Projects/flixx-app/index.html':
        case '/Projects/flixx-app/':
            displayPopularMovies();
            break;
        case '/Projects/flixx-app/shows.html':
            displayPopularShows();
            break;
        case '/Projects/flixx-app/movie-details.html':
            displayMovieDetails();
            break;
        case '/Projects/flixx-app/tv-details.html':
            console.log('TV Details');
            break;
        case '/Projects/flixx-app/search.html':
            console.log('Search');
            break;

    }
    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);