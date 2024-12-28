const parent= document.getElementById("parent")



document.getElementById("show-table").addEventListener("click",async () => {
    const data = await fetch("/progress_api")
    const result = await data.json()
    
    const tableHeader = document.getElementById("tableHeader");
    const tableBody = document.getElementById("tableBody")
    const header = Object.keys(result.data[0])
    console.log(header)
    for(head of header){
        console.log(head)
        const th = document.createElement("th");
        th.textContent = head
        tableHeader.appendChild(th);
    }

    for(item of result.data){
        const tr = document.createElement("tr");
        console.log(item)
        for(head of header){
            console.log(head)
            const td = document.createElement("td");
            td.innerText = item[head]
            
            tr.appendChild(td);
        }
        tableBody.appendChild(tr);
    }
})
