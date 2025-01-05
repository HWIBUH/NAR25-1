async function halos() {
    const data = await fetch("/api/progress_runquery");
    const result = await data.json();
    const tableHeader = document.getElementById("tableHeader");
    const tableBody = document.getElementById("tableBody");
    const header = Object.keys(result.data[0]);
    const traineeNumberIndex = header.indexOf('trainee_number');
    if (traineeNumberIndex > -1) {
        header.splice(traineeNumberIndex, 1);
        header.unshift('trainee_number');
    }

    tableHeader.innerHTML = "";
    tableBody.innerHTML = "";

    header.forEach((head) => {
        const th = document.createElement("th");
        if (head === "trainee_number") {
            th.innerHTML = `<p>Trainee</p>`;
        } else if (head === "RowSum") {
            th.innerHTML = `<p>Points</p>`; 
        } else {
            const newDiv = document.createElement("div");
            const newText = document.createElement("p");
            newText.innerHTML = head;
            const newButton = document.createElement("button");
            newButton.id = head;
            newButton.innerText = "DELETE";
            newButton.addEventListener("click", async () => {
                console.log(newButton.id);
                await fetch("/progress_delete", {
                    method: "DELETE",
                    headers: { "deleteColumn": newButton.id }
                });
                location.reload();
            });
            newDiv.appendChild(newText);
            newDiv.appendChild(newButton);
            th.appendChild(newDiv);
        }
        tableHeader.appendChild(th);
    });

    result.data.forEach((item) => {
        const tr = document.createElement("tr");
        header.forEach((head) => {
            const td = document.createElement("td");
            if (head === "trainee_number" || head === "RowSum") {
                td.innerText = item[head];
            } else {
                const dropdown = `
                    <option value="0" ${parseFloat(item[head]) === 0 ? "selected" : ""}>Belum</option>
                    <option value="0.35" ${parseFloat(item[head]) === 0.35 ? "selected" : ""}>Sentuh</option>
                    <option value="0.65" ${parseFloat(item[head]) === 0.65 ? "selected" : ""}>Debugging</option>
                    <option value="1" ${parseFloat(item[head]) === 1 ? "selected" : ""}>Selesai</option>`;
                console.log(dropdown)
                const newDropdown = document.createElement("select");
                newDropdown.id = item["trainee_number"] + head;
                newDropdown.style.borderRadius = "5px";
                newDropdown.style.marginLeft = "1vw";
                newDropdown.style.width = "5vw";
                newDropdown.innerHTML = dropdown;
                newDropdown.value = parseFloat(item[head]);
                
                newDropdown.addEventListener("change", async () => {
                    const selectedValue = newDropdown.value;
                    const dropdownId = newDropdown.id;
                    console.log(`Updating ${dropdownId} to ${selectedValue}`);
                    try {
                        const response = await fetch(`/checkProgressAPI`, {
                            method: 'GET',
                            headers: { "answerStatus": selectedValue, "dropdownId": dropdownId }
                        });
                        if (response.ok) {
                            console.log(`Value updated: ${selectedValue} for ${dropdownId}`);
                        } else {
                            console.error("Failed to update the value");
                        }
                    } catch (error) {
                        console.error("Error while updating:", error);
                    }
                });
                td.appendChild(newDropdown);
            }
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
    
    
}

halos();