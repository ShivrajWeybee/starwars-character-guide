'use strict';

const allCharacters = document.querySelector('.all-characters');
const oneCharacter = document.querySelectorAll('.one-character');
const popupbackdrop = document.querySelector('.popup-backdrop');
const popup = document.querySelector('.popup');
const title = document.querySelector('.title');
const birtyear = document.querySelector('.birthyear');
const gender = document.querySelector('.gender');
const species = document.querySelector('.species');
const films = document.querySelector('.films');
const popupIMG = document.querySelector('.pimg');

let count = 1;
let t;
let abc = [];


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
            // abc.push(data.results);
            // t = abc.flat();
            const ar = data.results;
            ar.forEach(i => {
                setImgagesSRC(count, i.name);
            })
            return data.next;
        })
        .then((next) => {
            if (!next) return;
            fetchApi(next);
        })
}

const setImgagesSRC = function(imgNo, charName) {
    // return new Promise(function(resolve, reject) {
        // fetch(`https://starwars-visualguide.com/assets/img/characters/${imgNo}.jpg`)
        // .then((res) => {
            if(imgNo == 17) {
                imgNo++;
                count++;
            }
            const html = `
            <div class="one-character">
                <img src='https://starwars-visualguide.com/assets/img/characters/${imgNo}.jpg' alt="" data-id=${imgNo} class="char-img">
                <div class="character-name">${charName}</div>
            </div>
            `
            allCharacters.insertAdjacentHTML('beforeend', html);
            count++;
        }
// )}

fetchApi(`https://swapi.dev/api/people/`);


allCharacters.addEventListener('click', callDetails);

async function callDetails(e) {
    const oneCharacter = e.target.closest('.one-character');
    if(!e.target.classList.contains('char-img') && !e.target.classList.contains('character-name')) return;

    togglePopup();

    const clickedChar = oneCharacter.querySelector('img').dataset.id;
    console.log(clickedChar);


    const fetchDetails = await fetch(`https://swapi.dev/api/people/${clickedChar}`);
    const res = await fetchDetails.json();
    console.log(res.name, res.birth_year, res.gender);
    title.innerHTML = res.name;
    birtyear.innerHTML = res.birth_year;
    gender.innerHTML = res.gender;

    let speciesArr = [];
    const speciesApi = res.species;
    speciesApi.forEach(i => {
        fetch(i).then(res => res.json()).then(data => {
            speciesArr.push(data.name);
            return console.log(speciesArr);
        }).then(() => {
            species.innerHTML = speciesArr.join(' , ');
        });
    })

    let filmtitle = [];
    const filmApi = res.films;
    filmApi.forEach(i => {
        fetch(i).then(res => res.json()).then(data => {
            filmtitle.push(data.title);
            return console.log(filmtitle);
        }).then(() => {
            films.innerHTML = filmtitle.join(' , ');
        });
    })
    console.log(res.films);
    films.innerHTML = filmApi;
    popupIMG.src = `https://starwars-visualguide.com/assets/img/characters/${clickedChar}.jpg`;
    // fetchDetails.then((res) => res.json()).then((data) => console.log(data));

    // popup.addEventListener('load', function() {
    //     
    // })
}

function togglePopup() {
    popupbackdrop.classList.remove('hidden');
    popup.classList.remove('hidden');
    const closeBTN = popup.querySelector('.fa-xmark');
    closeBTN.addEventListener('click', closePopup);
    popupbackdrop.addEventListener('click', closePopup);

    document.addEventListener('keydown', function(e) {
        if(e.key === 'Escape') {
            closePopup();
        }
    })
}

function closePopup() {
    popup.classList.add('hidden');
    popupbackdrop.classList.add('hidden');
}