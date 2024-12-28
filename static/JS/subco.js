const show = document.getElementById("show")
const next = document.getElementById("next")
const prev = document.getElementById("prev")
const question = document.querySelector(".question")
const answer = document.querySelector(".answer")

show.addEventListener("click", (e)=>{
    console.log("AAAAAAAa")
    question.classList.add("hidden")
    answer.classList.remove("hidden")
})

prev.addEventListener("click", (e)=>{
    console.log("BBBBBBBBBB")
    answer.classList.add("hidden")
    question.classList.remove("hidden")
})

next.addEventListener("click", (e) => {
    answer.classList.add("hidden")
    question.classList.remove("hidden")
})

async function subco() {
    const respon = await fetch('/api/subco')
    const subbco = await respon.json()

    const soal = document.querySelector(".pertanyaan_subco")
    const jawaban = document.querySelector(".jawaban_subco")

    // console.log(soal)
    // console.log(jawaban)
    // console.log(subbco[0].subco_pertanyaan)
    // console.log(subbco[0].subco_jawaban)

    soal.innerText = subbco[0].subco_pertanyaan
    jawaban.innerText = subbco[0].subco_jawaban

    // console.log(subbco)
}

function generate(){
    // console.log('pppp');
    subco();
}