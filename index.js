const url = 'https://rickandmortyapi.com/api/location';

const windowHeight = document.documentElement.clientHeight;
const windowWidth = document.documentElement.clientWidth;

const windowSquare = windowHeight * windowWidth;

const getSumResidents =  function(locations) {
  let residentsArray = [];
  locations.forEach((elem) => {
    residentsArray.push(elem.residents.length)
  });
  return residentsArray;
}

function getOneResidentSquare(locations) {
  const residentsSum = getSumResidents(locations).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0);

    return (windowSquare / residentsSum);
}

function createRectangle(quantityResidents, oneResidentSquare) {
  const div = document.createElement('div');

  div.classList.add("mystyle");
  div.style.width = `${windowWidth}px`;
  div.style.height = `${quantityResidents * (oneResidentSquare / windowWidth)}px`;
  document.body.appendChild(div);
}

fetch(url)
  .then(response => response.json())
  .then(results => ({
    oneResidentSquare: getOneResidentSquare(results.results),
    quantityResidents: getSumResidents(results.results)
  }))
  .then(res => res.quantityResidents.forEach(elem => createRectangle(elem, res.oneResidentSquare)));
