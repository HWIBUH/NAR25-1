const parent = document.getElementById("parent");
let isClicked = true;
document.getElementById("show-table").addEventListener("click", async (e) => {
    try {
        const data = await fetch("/progress_api");
        const result = await data.json();
        const tableHeader = document.getElementById("tableHeader");
        const header = Object.keys(result.data[0]);
        const traineeNumberIndex = header.indexOf('trainee_number');
        if (traineeNumberIndex > -1) {
            header.splice(traineeNumberIndex, 1);
            header.unshift('Trainee'); 
        }
        if (isClicked) {
            isClicked = false;
            for (let head of header) {
                const th = document.createElement("th");
                if (head !== "Trainee") {
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
                } else {
                    th.innerHTML = `<p>${head}</p>`;
                }
                tableHeader.appendChild(th);
            }
        }
    } catch (error) {
        console.error("Error fetching progress data:", error);
        const responseText = await data.text();
        console.error("Response text:", responseText);
    }
});

let isClicked2 = true;
document.getElementById("show-table2").addEventListener("click", async (e) => {
    try {
        const data2 = await fetch("/case_api");
        const result2 = await data2.json();
        const tableHeader2 = document.getElementById("tableHeader2");
        const header2 = Object.keys(result2.data[0]);
        const traineeNumberIndex2 = header2.indexOf('trainee_number');
        if (traineeNumberIndex2 > -1) {
            header2.splice(traineeNumberIndex2, 1);
            header2.unshift('Trainee'); 
        }
        if (isClicked2) {
            isClicked2 = false;
            for (let i = 0; i < header2.length; i++) {
                const head2 = header2[i];
                const th2 = document.createElement("th");
                if (head2 !== "Trainee") {
                    const newDiv2 = document.createElement("div");
                    const newText2 = document.createElement("p");
                    newText2.innerHTML = head2;
                    const newButton2 = document.createElement("button");
                    newButton2.id = head2;
                    newButton2.innerText = "DELETE";
                    newButton2.addEventListener("click", async () => {
                        console.log(newButton2.id);
                        await fetch("/case_delete", {
                            method: "DELETE",
                            headers: { "deleteColumn": newButton2.id }
                        });
                        location.reload();
                    });
                    newDiv2.appendChild(newText2);
                    newDiv2.appendChild(newButton2);
                    th2.appendChild(newDiv2);
                } else {
                    th2.innerHTML = `<p>${head2}</p>`;
                }
                tableHeader2.appendChild(th2);
            }
        }
    } catch (error) {
        console.error("Error fetching case data:", error);
        try {
            const responseText = await error.response.text();
            console.error("Response text:", responseText);
        } catch (e) {
            console.error("Error reading response text:", e);
        }
    }
});