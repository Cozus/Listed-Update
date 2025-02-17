const sliders = document.querySelector(".popular-content-box")
var scrollPerClick;
var ImagePadding=20;

showMovieData();

var scrollAmount = 0;

function sliderScrollLeft() {
    sliders.scrollTo({
        top: 0,
        left: (scrollAmount -= scrollPerClick),
        behavior: "smooth",
    });
    
    if (scrollAmount < 0) {
        scrollAmount = 0;
    }
}

function sliderScrollRight() {
    if (scrollAmount <= sliders.scrollWidth - sliders.clientWidth) {
        sliders.scrollTo({
            top: 0,
            left: (scrollAmount += scrollPerClick),
            behavior: "smooth",
        });
    }
}


async function showMovieData() {
    const api_key = "d6c47be3eedf41981636640bce40cd47";

    try {
        let response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc`
        );
        let result = response.data.results;

        result.map((cur, index) => {
            let className = index === 0 ? "img-1 slider-img" : `img-${index} slider-img`;

            sliders.insertAdjacentHTML(
                "beforeend",
                `<img class="${className}" src="https://image.tmdb.org/t/p/w185${cur.poster_path}" alt="Film Afişi" />`
            );
        });

        console.log("Tüm resimler eklendi");

        
        scrollPerClick=document.querySelector(".img-1").clientWidth+ImagePadding;
}
catch (error) {
    console.log(error);
}
}
