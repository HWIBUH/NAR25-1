const show = document.getElementById("show")
const next = document.getElementById("next")
const prev = document.getElementById("prev")
const question = document.querySelector(".question")
const answer = document.querySelector(".answer")

show.addEventListener("click", (e)=>{
    question.classList.add("hidden")
    answer.classList.remove("hidden")
})

prev.addEventListener("click", (e)=>{
    answer.classList.add("hidden")
    question.classList.remove("hidden")
})

async function subco() {
    const respon = await fetch('/api/subco')
    const subbco = await respon.json()

    

    console.log(subbco)
}

function generate(){
    console.log('pppp');
    subco();
}