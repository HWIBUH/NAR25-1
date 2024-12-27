console.log("Helo");
const list = document.getElementById("list-card");

let added = 0;
let deleted = 0;

function create(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}
function popAnnouncement(element) {
  console.log("pop");
  console.log(element);
  let target = element;
  deleteAnnouncement(target);

}

async function deleteAnnouncement(id) {
  console.log("target  id nya ", id);
  let intAngka = Number(id);
  const response = await fetch(`/api/delete_announcement/${id}`, {
    method : "DELETE"
  })

  const result = await response.json();
  if (result.success) {
    document.getElementById(`card${id}`).remove();
    console.log(`Deleted: ${deleted}`);
  }  
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
          <p>Date : ${element.announcement_deadline}</p>
          <button type="button" class="check-btn" onclick="popAnnouncement(${element.announcement_id})"></button>
      </div>
      `);
    list.appendChild(isi);
  });
}

function generate() {
  console.log("generate");
  fetchAnnouncement();
}
