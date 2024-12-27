async function generate_data() {
    const response = await fetch("/forum_todo_api")
    const data = await response.json()
    console.log(data)
    let newGrid = document.createElement("div");
    newGrid.id = "grid-forum";
    document.getElementById("forum-list").appendChild(newGrid)



    for (item of data.data){
        let element="<a href= "+item["forum_link"]+" target='_blank' >"+item["forum_id"]+"</a>"
        let newElement=document.createElement("div") //.classList.add("forum-container")
        newElement.innerHTML=element
        newElement.classList.add("forum-list-container")

        let newCheckbox = document.createElement("input")
        newCheckbox.type = "checkbox";
        newCheckbox.value = 0;
        newCheckbox.style.borderRadius = "5px";
        newCheckbox.style.marginLeft = "1vw";
        newCheckbox.style.width = "1vw";
        newCheckbox.style.backgroundColor = "var(--bean)"

        newElement.appendChild(newCheckbox);
        newGrid.appendChild(newElement)
        console.log(newElement)
    }
}
generate_data()