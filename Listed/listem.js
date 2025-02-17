let movieNameRef = document.getElementById('movie-name');
let movieButtonRef = document.getElementById('movie-button');
let resultRef = document.getElementById('result');
let searchButton = document.getElementById('search-button');
let moviesList = [];
let listRef = document.getElementById('movie-list');

let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=bcfd3d92`;
    
    if (movieName.length <= 0) {
        resultRef.innerHTML = "<h3>Enter a movie name</h3>";
    } else {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.Response == "True") {
                    resultRef.innerHTML = `
                        <div class="info">
                            <img src=${data.Poster}" alt="movie poster">
                            <div>
                                <h2>${data.Title}</h2>
                                <div class="rating">
                                    <img src="image/bxs-star.svg" alt="star">
                                    <h4>${data.imdbRating}</h4>
                                </div>
                                <div class="details">
                                    <span>${data.Rated}</span>
                                    <span>${data.Year}</span>
                                    <span>${data.Runtime}</span>
                                </div>
                                <div class="genre">
                                    <div>${data.Genre.split(",").join("</div><div>")}</div>
                                </div>
                            </div>
                        </div>
                        <h3>Plot:</h3>
                        <p>${data.Plot}</p>
                        <h3>Actors:</h3>
                        <p>${data.Actors}</p>
                        <button id="addToList">Listeme Ekle</button>
                    `;

                   
                    document.getElementById('addToList').addEventListener('click', () => {
                        let movie = {
                            title: data.Title,
                            poster: data.Poster,
                            year: data.Year
                        };
                        moviesList.push(movie);
                        showMovieList();
                        localStorage.setItem('movies', JSON.stringify(moviesList));
                    });
                } else {
                    resultRef.innerHTML = `<h3 class='msg'>Movie not found</h3> <h3>${data.Error}</h3>`;
                }
            })
            .catch(error => console.log(data.Error));
    }
};

function showMovieList() {
    listRef.innerHTML = moviesList.map(movie => `
        <li class="movie">
            <img src="${movie.poster}" alt="${movie.title}">
            <p>${movie.title} (${movie.year})</p>
        </li>
    `).join('');
}


moviesList = JSON.parse(localStorage.getItem('movies')) || [];
showMovieList();


searchButton.addEventListener('click', getMovie);