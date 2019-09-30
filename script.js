const form = document.querySelector("#addForm");

form.addEventListener("submit", e => {
  e.preventDefault();
  post();
});

function get() {
  fetch("https://frontend2019-28cd.restdb.io/rest/movies", {
    method: "get",
    headers: {
      "Content-type": "application/json; charset-utf-8",
      "x-apikey": "5d887478fd86cb75861e25fe",
      "cache-control": "no-cache"
    }
  })
    .then(elm => elm.json())
    .then(movies => {
      movies.forEach(addNewMovie);
    });
}

get();

function addNewMovie(movie) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector("article.movie").dataset.movieid = movie._id;

  copy.querySelector("h1").textContent = movie.name;
  copy.querySelector("h2").textContent = movie.year;
  copy.querySelector("p").textContent = movie.protagonist;
  copy.querySelector(".delete").addEventListener("click", () => {
    deleteIt(movie._id);
  });
  document.querySelector("#app").prepend(copy);
}

function post() {
  const movie = {
    name: form.elements.name.value,
    year: form.elements.year.value,
    protagonist: form.elements.protagonist.value
  };

  const postData = JSON.stringify(movie);
  console.log(postData);
  fetch("https://frontend2019-28cd.restdb.io/rest/movies", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887478fd86cb75861e25fe",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      addNewMovie(data);
    });
}

function deleteIt(id) {
  fetch("https://frontend2019-28cd.restdb.io/rest/movies/" + id, {
    method: "delete",
    headers: {
      "Content-type": "application/json; charset-utf-8",
      "x-apikey": "5d887478fd86cb75861e25fe",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      document.querySelector(`.movie[data-movieid="${id}"]`).remove();
    });
}
