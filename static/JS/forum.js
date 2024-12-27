async function generate_data() {
    const response = await fetch("/forum_todo_api")
    const data = await response.json()
    for (item of data.data){
        let element="<a href= "+item["forum_link"]+" target='_blank' >"+item["forum_id"]+"</a>"
        let newElement=document.createElement("div")
        newElement.innerHTML=element
        document.getElementById("forum-list").appendChild(newElement)
        console.log(newElement)
    }
}
generate_data()