console.log("Helo");
const list = document.getElementById("list");

let added = 0;
let deleted = 0;
let isi;

function generate() {
  const newIsi = localStorage.getItem("newElement");
  const newAdded = localStorage.getItem("added");
  console.log(newAdded);
  console.log(newIsi);
  //   list.appendChild(isi);
  added++;
}

function clear() {
  added = 0;
  let count = list.childElementCount;
  deleted += count;
  list.textContent = "";
}

function pop(element) {
  document.getElementById(`card${element}`).remove();
  deleted++;
}
