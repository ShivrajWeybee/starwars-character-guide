console.log('hello');
const allCharacters = document.querySelector('.all-characters');

// const api = fetch(`https://swapi.dev/api/people/`)
// .then(res => res.json())
// .then(data => {
//     const ar = data.results;
//     console.log(data)
//     return ar.forEach(i => {
//         setImgagesSRC(ar.indexOf(i)+1, i.name);
//         console.log(i.name)
//     });
// });

const fetchApi = function(url) {
    const api = fetch(url)
    .then(res => res.json())
    .then(data => {
    const ar = data.results;
    ar.forEach(i => {
        setImgagesSRC(ar.indexOf(i)+1, i.name);
        console.log(i.name);
    })
    return data.next;
    })
    .then((next) => {
        if(!data) return;
        fetchApi(data.next);
    })
}

fetchApi(`https://swapi.dev/api/people/`);

const setImgagesSRC = function(imgNo, charName) {
    return new Promise(function(resolve, reject) {
        const html = `
        <div class="one-character">
            <img src="https://starwars-visualguide.com/assets/img/characters/${imgNo}.jpg" alt="">
            <div class="character-name">${charName}</div>
        </div>
        `

        allCharacters.insertAdjacentHTML('beforeend', html);
    })
}

// setImgagesSRC(1);