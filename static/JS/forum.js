async function generate_data() {
    const response = await fetch("/forum_todo_api")
    const data = await response.json()

    let newGrid = document.createElement("div");
    newGrid.id = "grid-forum";
    document.getElementById("forum-list").appendChild(newGrid)



    for (item of data.data){
        let element="<a href= "+item["forum_link"]+">"+item["forum_id"]+"</a>"
        element+=`<input type='checkbox' id = ${item["forum_id"]} ${item["isAnswered"] == 1 ?"checked":""}>`
        const newElement=document.createElement("div")
        newElement.innerHTML=element
        newElement.id=item["forum_id"]
        
        newElement.addEventListener("change",(event)=>{
            // console.log(newElement.id)
            // if (event.target.checked) {
                (async () => {
                    // ini tuh buat passing 
                    
                    const response = await fetch(`/checkTheBoxAPI?forum_id=${newElement.id}`, {
                        method: 'GET',
                    });
                    console.log("ischeck"+newElement.id)
                    // const result = await response.json()
                    
                })()
                
            // } else {
            //     console.log("ga kecheck")
            // }
        })
        document.getElementById("forum-list").appendChild(newElement)
    }
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