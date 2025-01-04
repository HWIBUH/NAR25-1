const parent = document.getElementById("parent");
let isClicked = true;
document.getElementById("show-table").addEventListener("click", async (e) => {
    try {
        const data = await fetch("/case_api");
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
                        await fetch("/case_delete", {
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
        console.error("Error fetching case data:", error);
        try {
            const responseText = await error.response.text();
            console.error("Response text:", responseText);
        } catch (e) {
            console.error("Error reading response text:", e);
        }
    }
});