async function generate_data() {
    const response = await fetch("/forum_all_api")
    const data = await response.json()

    let newGrid = document.createElement("div");
    newGrid.id = "grid-forum";
    // document.getElementById("forum-list").appendChild(newGrid)



    for (item of data.data){
        let element="<a href= "+item["forum_link"]
        element+=` style="border-radius:5px; margin-left:1vw; width:1vw;">`+item["forum_id"]+"</a>"
        const newElement=document.createElement("div")
        newElement.innerHTML=element
        newElement.id=item["forum_id"]
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