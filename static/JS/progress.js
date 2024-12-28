document.getElementById("show-table").addEventListener("click", async () => {
    console.log("Button clicked");
    const data = await fetch("/progress_api");
    const result = await data.json();

    const tableHeader = document.getElementById("tableHeader");
    const tableBody = document.getElementById("tableBody");

    tableHeader.innerHTML = "";
    tableBody.innerHTML = "";

    const header = Object.keys(result.data[0]);

    const traineeNumberIndex = header.indexOf('trainee_number');
    if (traineeNumberIndex > -1) {
        header.splice(traineeNumberIndex, 1);
        header.unshift('trainee_number');
    }

    let isTrainee = true

    header.forEach((head) => {
        const th = document.createElement("th");
        if(isTrainee){
            isTrainee = false
            th.textContent = 'TNumber'
        }else{
            th.textContent = head;
        }
        console.log(head)
        tableHeader.appendChild(th);
    });

    result.data.forEach((row) => {
        const tr = document.createElement("tr");
        header.forEach((head) => {
            const td = document.createElement("td");
            td.textContent = row[head] || ""; 
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
});