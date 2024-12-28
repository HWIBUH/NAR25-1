
async function halos() {
    
    const data = await fetch("/api/progress_runquery")
    const result = await data.json()
    const tableHeader = document.getElementById("tableHeader");
    const tableBody = document.getElementById("tableBody")
    const header = Object.keys(result.data[0])
    const traineeNumberIndex = header.indexOf('trainee_number');
    if (traineeNumberIndex > -1) {
        header.splice(traineeNumberIndex, 1);
        header.unshift('trainee_number');
    }
    for(head of header){
        const th = document.createElement("th");
        if(head!="trainee_number" && head!="RowSum"){
            const newDiv=document.createElement("div");
            const newText=document.createElement("p")
            newText.innerHTML=head
            const newButton=document.createElement("button")
            newButton.id=head
            newButton.innerText="DELETE"
            newButton.addEventListener("click",async()=>{
                console.log(newButton.id)
                await fetch("/progress_delete",{
                    method:"DELETE",
                    headers:{"deleteColumn":newButton.id}
                })
                location.reload()
            })
            newDiv.appendChild(newText)
            newDiv.appendChild(newButton)
            th.appendChild(newDiv)
            tableHeader.appendChild(th);
        }
        else{
            const newDiv=document.createElement("div");
            const newText=document.createElement("p")
            newText.innerText=head
            newDiv.appendChild(newText)
            th.appendChild(newDiv)
            tableHeader.appendChild(th);
        }
    }
    
    for(item of result.data){
        const tr = document.createElement("tr");
        for(head of header){
            if(head=="trainee_number" || head=="RowSum"){
                const td = document.createElement("td");
                td.innerText = item[head]
                tr.appendChild(td);
            }else{
            const td = document.createElement("td");
            let dropdown = `<option value="0" ${item[head] == 0 ? "selected" : ""}>Belum</option>
            <option value="1" ${item[head] == 1 ? "selected" : ""}>Sentuh</option>
            <option value="2" ${item[head] == 2 ? "selected" : ""}>Debug</option>
            <option value="3" ${item[head] == 3 ? "selected" : ""}>Kelar</option>`;
            const newDropdown=document.createElement("select")
            newDropdown.id=item["trainee_number"]+head
            newDropdown.style.borderRadius="5px";
            newDropdown.style.marginLeft="1vw";
            newDropdown.style.Width="5vw";
            newDropdown.innerHTML=dropdown
            newDropdown.addEventListener("change",() => {

                (async () => {
                    console.log(newDropdown.value)
                    const selectedValue = newDropdown.value;
                    // ini tuh buat passing 
                    console.log(newDropdown.id)
                    console.log(selectedValue)
                    await fetch(`/checkTheProgressAPI`, {
                        method: 'GET',
                        headers: {"answerStatus":selectedValue,"dropdownId":newDropdown.id}
                    });

                    // const result = await response.json()
                })()
            })
            tr.appendChild(newDropdown)
            tr.appendChild(td);
            }
        }
        tableBody.appendChild(tr);
    }
}


halos()

// document.getElementById("show-table").addEventListener("click", async () => {
//     console.log("Button clicked");
//     const data = await fetch("/progress_api");
//     const result = await data.json();

//     const tableHeader = document.getElementById("tableHeader");
//     const tableBody = document.getElementById("tableBody")
//     const header = Object.keys(result.data[0])
//     console.log(header)
//     for(head of header){
//         console.log(head)
//         const th = document.createElement("th");
//         th.textContent = head
//         tableHeader.appendChild(th);
//     }

//     for(item of result.data){
//         const tr = document.createElement("tr");
//         console.log(item)
//         for(head of header){
//             console.log(head)
//             const td = document.createElement("td");
//             td.innerText = item[head]
            
//             tr.appendChild(td);
//         }
//         tableBody.appendChild(tr);
//     }
// })
