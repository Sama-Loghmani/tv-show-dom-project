// fetching data from tvmaze api
const getData = async () => {
    const res = await axios.get("https://api.tvmaze.com/shows/1/episodes");
    return res.data;
};

const ul = document.querySelector(".card-container");

// a function for rendering data on DOM
const renderData = async () => {
    const episodes = await getData();
    console.log(episodes);

    // creating html for adding to the ul element
    const html = episodes
        .map((episode) => {
            return `<li class="card">
                 <div>
                   <img src="${episode.image.medium}" alt="${episode.name} image">
                 </div>       
              <div>
               <h4>
                S0${episode.season}E${episode.number}
                ${episode.name}
               </h4>
               <p class="summary">${episode.summary}</p>
              </div>
             </li>
        `;
        })
        .join("");
    ul.innerHTML = html;
};

// an eventListener for loading fetched data to the DOM
document.addEventListener("DOMContentLoader", renderData());

/***************************** *sarching section ******************************** */

// getting input element
let input = document.querySelector("input");

// addeventlistener on input to display shows based on input value
input.addEventListener("keyup", (e) => {
    e.preventDefault();

    let inputValue = e.target.value.toLowerCase();
    console.log(inputValue);
    const cards = document.querySelectorAll(".card");
    for (let i = 0; i < cards.length; i++) {
        if (!cards[i].innerHTML.toLowerCase().includes(inputValue)) {
            cards[i].style.display = "none";
        } else {
            cards[i].style.display = "block";
        }
    }
});

/* ****************************** episodes selctor **********************/

// getting selection element
const selector = document.getElementById("selector");
console.log(selector);
// addeventlistener on selection
selector.addEventListener("change", () => {
    const cards = document.querySelectorAll(".card");
    const option = document.querySelectorAll(".optionClass");
    const strUser = selector.options[selector.selectedIndex].text;
    for (let i = 0; i < selector.length; i++) {
        if (option[i].value === strUser) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none;";
        }
    }
});
