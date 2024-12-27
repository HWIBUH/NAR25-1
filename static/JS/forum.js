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
        const parent=document.createElement("div")
        parent.style.backgroundColor="var(--hijau-sean)"

        let element="<a href= "+item["forum_link"]+">"+item["forum_id"]+"</a>"
        const newElement=document.createElement("div")
        newElement.innerHTML=element
        newElement.id=item["forum_id"]
        

        let dropdown = `<option value="0" ${item["answer_status"] == 0 ? "selected" : ""}>Unanswered</option>
                <option value="1" ${item["answer_status"] == 1 ? "selected" : ""}>Unchecked</option>
                <option value="2" ${item["answer_status"] == 2 ? "selected" : ""}>Wrong</option>
                <option value="3" ${item["answer_status"] == 3 ? "selected" : ""}>Correct</option>`;
        const newDropdown=document.createElement("select")
        newDropdown.id=item["forum_id"]
        newDropdown.style.borderRadius="5px";
        newDropdown.style.marginLeft="1vw";
        newDropdown.style.Width="5vw";
        newDropdown.innerHTML=dropdown

        parent.appendChild(newElement)
        parent.appendChild(newDropdown)

        // newCheckbox.style.borderRadius = "5px";
        // newCheckbox.style.marginLeft = "1vw";
        // newCheckbox.style.width = "1vw";
        // newCheckbox.style.backgroundColor = "var(--bean)"

        // newElement.getElementById("")
        newDropdown.addEventListener("change",(event)=>{
            // console.log(newElement.id)
            // if (event.target.checked) {
                
                    (async () => {
                        console.log(newDropdown.value)
                        const selectedValue = newDropdown.value;
                        
                        // ini tuh buat passing 
                        
                        await fetch(`/checkTheBoxAPI?forum_id=${newDropdown.id}`, {
                            method: 'GET',
                            headers: {"answerStatus":selectedValue}
                        });
                        console.log("ischeck"+newDropdown.id)
                        // const result = await response.json()
                        
                    })()
                
            // } else {
            //     console.log("ga kecheck")
            // }
        })
        newGrid.appendChild(parent)
        
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