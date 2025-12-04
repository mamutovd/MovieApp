function searchMovies() {
    const searchTerm = document.getElementById('searchInput').value;
    if (searchTerm.trim()) {
        alert(`Searching for: ${searchTerm}`);
    } else {
        alert('Please enter a movie name to search');
    }
}

document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchMovies();
    }
});

document.querySelector('.registration-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for registering! We will contact you soon.');
    this.reset();
});

// Скролл
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const apiKey = "88fcaa75"; 
const movieList = [
    "Beauty and the Beast",
    "Now You See Me 3",
    "The Intouchables",
    "Interstellar",
    "The Green Mile",
    "Shutter Island",
    "Green Book",
    "Inception",
    "The Dark Knight",
    "Gladiator",
    "Forrest Gump",
    "Coco",
    "Fight Club"
];

const movieContainer = document.getElementById("movies");
movieContainer.innerHTML = "";

// Модалка
const modal = document.getElementById("movieModal");
const modalPoster = document.getElementById("modalPoster");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalActors = document.getElementById("modalActors");
const modalGenre = document.getElementById("modalGenre");
const modalRating = document.getElementById("modalRating");
const closeModal = document.querySelector(".modal .close");

// Создание карточек и добавление клика для модалки
movieList.forEach(title => {
    fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            if(data.Response === "True") {
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
                    <img src="${data.Poster !== "N/A" ? data.Poster : "img/default.jpg"}" alt="${data.Title}">
                    <div class="card-content">
                        <div class="card-title">${data.Title} (${data.Year})</div>
                        <div class="card-info">
                            <span class="year">${data.Year}</span>
                            <span class="rating">⭐ ${data.imdbRating}</span>
                        </div>
                    </div>
                `;
                movieContainer.appendChild(card);

                // ✅ Вешаем обработчик клика на модалку сразу после создания карточки
                card.addEventListener("click", () => {
                    modalPoster.src = data.Poster !== "N/A" ? data.Poster : "img/default.jpg";
                    modalTitle.textContent = `${data.Title} (${data.Year})`;
                    modalDescription.textContent = data.Plot;
                    modalActors.textContent = data.Actors;
                    modalGenre.textContent = data.Genre;
                    modalRating.textContent = data.imdbRating;
                    modal.style.display = "block";
                });
            } else {
                console.log(`Фильм "${title}" не найден в OMDb.`);
            }
        })
        .catch(err => console.error(err));
});

// Закрытие модалки
closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => {
    if(e.target === modal) modal.style.display = "none";
});



const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    burger.classList.toggle('active');
});
