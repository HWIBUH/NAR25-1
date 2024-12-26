console.log("Helo");
const list = document.getElementById("list");

let added = 0;
let deleted = 0;

function create(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

async function fetchAnnouncement() {
  const response = await fetch("/api/announcement");
  const announcements = await response.json();

  announcements.forEach((element) => {
    console.log(element.announcement_id);
    console.log(element.announcement_title);
    console.log(element.announcement_content);
    console.log(element.announcement_deadline);

    let isi = null;
    isi = create(`
      <div class = "announcement-card" id="card${element.announcement_id}">
          <h2>${element.announcement_title}</h2>
          <p>${element.announcement_content}</p>
          <p>${deadline.value}</p>
          <button type="button" class="check-btn" onclick="pop(${added})"></button>
      </div>
      `);
  });
}

function generate() {
  console.log("generate");
  fetchAnnouncement();
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
