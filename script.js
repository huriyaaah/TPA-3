const API_KEY ='api_key=548c5c6957eac6b0a4ea5e0ab58d5cbb';
const BASE_URL ='https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(API_URL);

function getMovies(url){
    fetch(url).then(response => response.json()).then(data =>{
        console.log(data.results);
        showMovies(data.results)
    })
}

function showMovies(data){
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieCard = document.createElement('div')
        movieCard.classList.add('movie')
        movieCard.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">

        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
        `

        main.appendChild(movieCard)
    })
}

form.addEventListener('change', (e) => {
    e.preventDefault();

    const searchMovies = search.value;
    if (searchMovies) {
        getMovies(searchURL + '&query=' + searchMovies)
    } else {
        getMovies(API_URL)
    }
})
