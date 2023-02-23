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

fetch(url)
  .then((response) => response.json())
  .then((results) => {
    getArrayOfResidents(results.results).forEach((quantityOfResidents) =>
      createRectangle(
        quantityOfResidents,
        getOneResidentSquare(results.results)
      )
    );

    document
      .querySelectorAll("div:not(:first-child)")
      .forEach((elem, index) => {
        console.log(elem);
        elem.addEventListener("mouseover", () => {
          document.getElementById("testData").textContent =
            results.results[index].name;
          popupBg.classList.add("active");
          popup.classList.add("active");

          closePopupButton.addEventListener("click", () => {
            popupBg.classList.remove("active");
            popup.classList.remove("active");
          });

          window.addEventListener("keydown", (event) => {
            if (event.key === "Esc" || event.key === "Escape") {
              popupBg.classList.remove("active");
              popup.classList.remove("active");
            }
          });
        });

        elem.addEventListener("mouseout", () => {
          // document.getElementById("testData").textContent = "";
          popupBg.classList.remove("active");
          popup.classList.remove("active");
        });
      });
  });
