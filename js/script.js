const global = {
    currentPage: window.location.pathname,
}

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


// Fetch data from TMDB API

async function fetchAPIData(endpoint){
    const API_KEY = '254c8da735e5e272fb7eaa7b1019fd61';
    const API_URL = 'https://api.themoviedb.org/3/';

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

    const data = await response.json();

    return data;
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
            console.log('Shows');
            break;
        case '/Projects/flixx-app/movie-details.html':
            console.log('Movie Details');
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