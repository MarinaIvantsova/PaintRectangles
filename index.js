const url = "https://rickandmortyapi.com/api/location";

const windowHeight = document.documentElement.clientHeight;
const windowWidth = document.documentElement.clientWidth;

const windowSquare = windowHeight * windowWidth;
const popupBg = document.querySelector(".popup__bg");
const popup = document.querySelector(".popup");
const closePopupButton = document.querySelector(".close-popup");

function getArrayOfResidents(locations) {
  return locations.map((elem) => elem.residents.length);
}

function getOneResidentSquare(locations) {
  const residentsSum = getArrayOfResidents(locations).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return windowSquare / residentsSum;
}

function createRectangle(quantityOfResidents, oneResidentSquare) {
  const div = document.createElement("div");

  div.classList.add("mystyle");
  div.style.width = `${windowWidth}px`;
  div.style.height = `${
    quantityOfResidents * (oneResidentSquare / windowWidth)
  }px`;
  div.textContent = quantityOfResidents;
  document.body.appendChild(div);
}

function handleSemiRect(myHeight, myWidth, quantityOfResidents) {
  const div = document.createElement("div");

  div.classList.add("mystyle-semi");
  div.style.width = `${myWidth.toFixed(0) - 11}px`;
  div.style.height = `${(myHeight + 20).toFixed(0)}px`;
  div.textContent = quantityOfResidents;
  document.body.appendChild(div);
}

fetch(url)
  .then((response) => response.json())
  .then((results) => {
    
    const fewResidents = [];

    getArrayOfResidents(results.results).forEach((quantityOfResidents) => {
      if (quantityOfResidents > 4) {
        createRectangle(
          quantityOfResidents,
          getOneResidentSquare(results.results)
        );
      } else {
        fewResidents.push(quantityOfResidents);
      }
    });

    for (let i = 0; i < fewResidents.length; i += 2) {
      const oldHeightPrev =
        (2 + fewResidents[i]) *
        (getOneResidentSquare(results.results) / windowWidth);
      const oldHeightNext =
        (2 + fewResidents[i + 1]) *
        (getOneResidentSquare(results.results) / windowWidth);

      const newHeight = oldHeightPrev + oldHeightNext;
      const newWidthPrev = (oldHeightPrev * windowWidth) / newHeight;
      const newWidthNext = (oldHeightNext * windowWidth) / newHeight;

      handleSemiRect(newHeight, newWidthPrev, fewResidents[i]);
      handleSemiRect(newHeight, newWidthNext, fewResidents[i + 1]);
    }

    document
      .querySelectorAll("div:not(:first-child)")
      .forEach((elem, index) => {

        const processChange = debounce(() => showPopup());
        
        const showPopup = () => {
          document.getElementById("testData").textContent =
          results.results[index].name;
          popupBg.classList.add("active");
          popup.classList.add("active");
        };
        
        elem.addEventListener("mouseover", processChange);

        closePopupButton.addEventListener("click", () => {
          popupBg.classList.remove("active");
          popup.classList.remove("active");
        });

        elem.addEventListener("mouseout", () => {
          popupBg.classList.remove("active");
          popup.classList.remove("active");
        });

        window.addEventListener("keydown", (event) => {
          if (event.key === "Esc" || event.key === "Escape") {
            popupBg.classList.remove("active");
            popup.classList.remove("active");
          }
        });

        function debounce(func, timeout = 300){
          let timer;
          return () => {
            clearTimeout(timer);
            timer = setTimeout(() =>  func.apply(this), timeout);
          };
      }});
  });
