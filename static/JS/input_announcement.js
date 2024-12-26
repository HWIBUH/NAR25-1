console.log("Input");
const title = document.getElementById("title");
const desc = document.getElementById("desc");
const deadline = document.getElementById("deadline");

// function create tag template element html
function create(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}
let added = 0;

let isi;
function add() {
  let titleValue = title.value;
  let descValue = desc.value;
  let deadlineValue = deadline.value;

  if (titleValue == "" || descValue == "" || deadlineValue == "") {
    alert("Please input all the data");
    return;
  }
  isi = create(`
        <div class = "announcement-card" id="card${added}">
            <h2>${title.value}</h2>
            <p>${desc.value}</p>
            <p>${deadline.value}</p>
            <button type="button" class="check-btn" onclick="pop(${added})"></button>
        </div>
        `);
  added++;
  title.value = "";
  desc.value = "";
  deadline.value = "";
  localStorage.setItem("newElement", isi);
  localStorage.setItem("added", added);
}
