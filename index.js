const url = 'https://rickandmortyapi.com/api/location';

const windowHeight = document.documentElement.clientHeight;
const windowWidth = document.documentElement.clientWidth;

const windowSquare = windowHeight * windowWidth;

function getArrayOfResidents(locations) {
  return locations.map(elem => elem.residents.length);
}

function getOneResidentSquare(locations) {
  const residentsSum = getArrayOfResidents(locations).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0);

    return (windowSquare / residentsSum);
}

function createRectangle(quantityOfResidents, oneResidentSquare) {
  const div = document.createElement('div');

  div.classList.add('mystyle');
  div.style.width = `${windowWidth}px`;
  div.style.height = `${quantityOfResidents * (oneResidentSquare / windowWidth)}px`;
  document.body.appendChild(div);
}

fetch(url)
  .then(response => response.json())
  .then(results => {
    return getArrayOfResidents(results.results)
    .forEach(quantityOfResidents => createRectangle(quantityOfResidents, getOneResidentSquare(results.results))
  )});