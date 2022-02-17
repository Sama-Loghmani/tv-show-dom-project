const cardsContainer = document.createElement("div");
cardsContainer.classList =
    "cards-container p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5";
const selector = document.querySelector("#episode-selector");

const getData = async () => {
    const showsApi = await axios.get("https://api.tvmaze.com/shows/1/episodes");

    return showsApi;
};

// function for creating shows section html
function htmlCreator() {
    getData().then((res) => {
        res.data.forEach((episode) => {
            // create select options
            const option = document.createElement("option");
            option.className = "option-class";
            if (episode.number >= 10) {
                option.innerHTML = `S0${episode.season}E${episode.number} - ${episode.name}`;
                option.value = `S0${episode.season}E${episode.number} - ${episode.name}`;
            } else {
                option.innerHTML = `S0${episode.season}E0${episode.number} - ${episode.name}`;
                option.value = `S0${episode.season}E0${episode.number} - ${episode.name}`;
            }
            selector.appendChild(option);

            // creating single card

            const card = document.createElement("div");

            card.classList = "card-class rounded overflow-hidden shadow-lg";
            const image = document.createElement("img");
            image.classList = "w-full";
            image.src = episode.image.medium;
            const div1 = document.createElement("div");
            div1.classList = "px-6 py-4";
            const title = document.createElement("div");
            title.classList = "font-bold text-xl mb-2";
            const episodes = episode.number;
            if (episodes >= 10) {
                title.textContent = `S0${episode.season}E${episode.number} - ${episode.name}`;
            } else {
                title.textContent = `S0${episode.season}E0${episode.number} - ${episode.name}`;
            }
            const pElem = document.createElement("p");
            pElem.classList = "text-gray-700 text-base";
            pElem.innerHTML = episode.summary;
            div1.append(title, pElem);
            const div2 = document.createElement("div");
            div2.classList = "px-6 pt-4 pb-2";
            const span = document.createElement("span");
            span.classList =
                "span1 inline-block rounded-full px-3 py-1 text-sm font-semibold text-white-700 mr-2 mb-2";
            const span2 = document.createElement("span");
            span2.classList =
                "inline-block bg-yellow-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2";

            const link = document.createElement("a");

            link.href = `${episode.url}`;
            span2.textContent = episode.rating.average;
            link.textContent = "Watch Now";
            span.appendChild(link);
            div2.append(span, span2);

            card.append(image, div1, div2);
            cardsContainer.appendChild(card);
            document.body.appendChild(cardsContainer);
        });
    });
}
htmlCreator();

/* **************************************Search section **************************/
let input = document.querySelector("input");

input.addEventListener("keyup", (e) => {
    e.preventDefault();
    let inputValue = e.target.value.toLowerCase();
    let count = 0;
    const cards = document.querySelectorAll(".card-class");
    for (let i = 0; i < cards.length; i++) {
        if (!cards[i].innerHTML.toLowerCase().includes(inputValue)) {
            cards[i].style.display = "none";
        } else {
            cards[i].style.display = "block";
            count++;
        }
    }
    const span = document.querySelector(".matching-number");
    span.textContent = `${count} Shows Found`;
});

/** ------------select option section  --------------- */
selector.addEventListener("change", (e) => {
    const userOption = e.target.value;
    const cards = document.querySelectorAll(".card-class");
    const options = document.querySelectorAll(".option-class");

    if (selector.value === "all") {
        for (let element of cards) {
            element.style.display = "block";
        }
    } else {
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === userOption) {
                cards[i].style.display = "block";
            } else {
                cards[i].style.display = "none";
            }
        }
    }
});
