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
                   <img src="${episode.image.medium}" alt="">
                 </div>       
              <div>
               <h4>
                S${episode.season}E${episode.number}
                ${episode.name}
               </h4>
               <p class="summary">${episode.summary}</p>
              </div>
             </li>
        `;
        })
        .join("");
    ul.innerHTML = html;
    console.log(html);
};

// an eventListener for loading fetched data to the DOM
document.addEventListener("DOMContentLoader", renderData());

/* */
