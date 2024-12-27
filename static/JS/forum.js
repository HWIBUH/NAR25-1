// async function generate_data() {
//     const response = await fetch("/forum_todo_api")
//     const data = await response.json()
//     console.log(data)
//     let newGrid = document.createElement("div");
//     newGrid.id = "grid-forum";
//     document.getElementById("forum-list").appendChild(newGrid)



//     for (item of data.data){
//         let element="<a href= "+item["forum_link"]+" target='_blank' >"+item["forum_id"]+"</a>"
//         let newElement=document.createElement("div") //.classList.add("forum-container")
//         newElement.innerHTML=element
//         newElement.classList.add("forum-list-container")

//         let newCheckbox = document.createElement("input")
//         newCheckbox.type = "checkbox";
//         newCheckbox.value = 0;
//         newCheckbox.style.borderRadius = "5px";
//         newCheckbox.style.marginLeft = "1vw";
//         newCheckbox.style.width = "1vw";
//         newCheckbox.style.backgroundColor = "var(--bean)"

//         newElement.appendChild(newCheckbox);
//         newGrid.appendChild(newElement)
//         console.log(newElement)
//     }
// }
// generate_data()


async function generate_data() {
    const response = await fetch("/forum_todo_api",{
        method: 'GET',
        headers: {"traineeNumber":sessionStorage.getItem("userInitials")}
    })

    const data = await response.json()

    let newGrid = document.createElement("div");
    newGrid.id = "grid-forum";
    document.getElementById("forum-list").appendChild(newGrid)


    for (item of data.data){
        console.log(item)
        let element="<a href= "+item["forum_link"]+">"+item["forum_id"]+"</a>"
        element+=`<input type='checkbox' id = ${item["forum_id"]}`
        element+=`style="border-radius:5px; margin-left:1vw; width:1vw;" ${item["isAnswered"] == 1 ?"checked":"" }>`
        // newCheckbox.style.borderRadius = "5px";
        // newCheckbox.style.marginLeft = "1vw";
        // newCheckbox.style.width = "1vw";
        // newCheckbox.style.backgroundColor = "var(--bean)"

        const newElement=document.createElement("div")
        newElement.innerHTML=element
        newElement.id=item["forum_id"]
        newElement.style.backgroundColor="var(--hijau-sean)"
        // newElement.getElementById("")
        newElement.addEventListener("change",(event)=>{
            // console.log(newElement.id)
            // if (event.target.checked) {
                (async () => {
                    // ini tuh buat passing 
                    
                    await fetch(`/checkTheBoxAPI?forum_id=${newElement.id}`, {
                        method: 'GET',
                    });
                    console.log("ischeck"+newElement.id)
                    // const result = await response.json()
                    
                })()
                
            // } else {
            //     console.log("ga kecheck")
            // }
        })
        newGrid.appendChild(newElement)
        
    }
    document.getElementById("forum-list").appendChild(newGrid)
}
    // const classes=document.getElementsByClassName("check")
    // console.log(classes)
//     document.getElementById(forum_id).addEventListener("change",(event)=>{
            
//         console.log(forum_id)
//         if (event.target.checked) {
//             (async () => {
//                 // ini tuh buat passing 
//                 const response = await fetch(`/checkTheBoxAPI?forum_id=${forum_id}`, {
//                     method: 'GET',
//                 });
//                 const result = await response.json()
                
//             })
            
//         } else {
//             console.log("Checkbox is unchecked");
//         }
//     })
// }
generate_data()