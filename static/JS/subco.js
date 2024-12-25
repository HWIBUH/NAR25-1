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