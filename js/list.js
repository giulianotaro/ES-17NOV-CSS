import { render, API } from "./utils.js";

const List = (data) => {
  const elements = data
    .map(
      (item) => `<li>
        <a href="#view-${item.id}"> ${item.title} </a> <br> ${item.year} <br> <img src="${item.poster} "/> <br>
        <a class="edit" href="#edit-${item.id}">Aggiorna scheda</a>
        <button class="delete" id="${item.id}">Elimina scheda</button>
      </li>`
    )
    .join("");

  const container = document.querySelector("#container");
  render(
    container,
    `
    <p> schede <br> film 🍿 </p>
    <ul>${elements}</ul>
    <a href="#add" id="add">Aggiungi una nuova scheda</a>
    `
  );

  const btns = [...document.querySelectorAll(".delete")];

  const deleteItem = (event) => {
    const id = parseInt(event.target.id);
    const filtered = data.filter((movie) => movie.id !== id);

    fetch(`${API}/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then(() => List(filtered));
  };

  const btnClicks = (btn) =>
    btn.addEventListener("click", deleteItem, { once: true });

  btns.forEach(btnClicks);
};

export { List };