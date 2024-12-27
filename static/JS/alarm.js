const display = document.getElementById('time');
const navdis = document.getElementById('time-clock');
const bigTime = document.getElementById('big-time');
const form = document.getElementById('trainee-form')

let nexta = nextAlarm(); 
const tingnung = new Audio("../static/assets/death.mp3"); 
tingnung.loop = true;
i=0
const q1= document.getElementById('quiz1');
const q2 = document.getElementById('quiz2');


function upTime() {
    const date = new Date();

    const hour = String(date.getHours()).padStart(2, '0'); 
    const min = String(date.getMinutes()).padStart(2, '0'); 
    const sec = String(date.getSeconds()).padStart(2, '0');
    // Ivy, gw komen soalnya ini bikin error tadi
    if(navdis != null)
    {
        navdis.innerText = `${hour} : ${min} : ${sec}`;
    }
    if(bigTime != null)
    {
        bigTime.innerText = `${hour} : ${min} : ${sec}`;//tambahin ini buat main page
    }
    i++
    console.log(i);
    if(trimin(date)||i%20==0){
        (async()=>{
            const response = await fetch('/randomize');
            const result = await response.json();
            console.log(result)
            const image=document.getElementById("trainee-img")
            console.log(result.data.trainee_photo)
            image.src=result.data.trainee_photo
            pop();
            tingnung.play();
            tingnung.loop = true;
            nexta = nextAlarm(); 
        })()
    }
    
    // console.log("Current Time:", date);
    // console.log("Next Alarm:", nexta);
}

function nextAlarm() {
    const datea = new Date();
    const mina = datea.getMinutes();

    if (mina < 30) datea.setMinutes(30, 0, 0); 
    else datea.setHours(datea.getHours() + 1, 0, 0, 0); 

    return datea; 
}

function trimin(curr) {
    return curr.getHours() === nexta.getHours() && curr.getMinutes() === nexta.getMinutes() && curr.getSeconds() === 0;
}

function popout() {
    const popup = document.getElementById('bangunPop');
    popup.classList.remove('active');
    popup.classList.add('inactive');
    
    q1.classList.add('active');
    q1.classList.remove('inactive'); 
    q2.classList.add('active');
    q2.classList.remove('inactive');
}

function pop() {
    const popup = document.getElementById('bangunPop');
    popup.classList.remove('inactive');
    popup.classList.add('active');
}

if(form != null)
{
    form.addEventListener('submit', async(event)=> {
        event.preventDefault();
    
        const formData = new FormData(form);
        const response = await fetch('/checkForm', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        console.log(result);
        if (result.flag === 1) {
            q1.classList.add('inactive');
            q1.classList.remove('active'); 
            q2.classList.add('inactive');
            q2.classList.remove('active');
            tingnung.loop=false
            await fetch('/mainPage');
        } else {
            const siapa=document.getElementById("siapa")
            siapa.innerText="Badut kak, kok salah"
            tingnung.play()
            tingnung.loop=true
        }
    })
}

// function afterpop(){
//     function waitForFormSubmit() {
//         return new Promise((resolve) => {
//             const form = document.getElementById('trainee-form');
//             form.addEventListener('submit', async (event) => {
//                 event.preventDefault();
//                 const formData = new FormData(form);
//                 const response = await fetch('/checkForm', {
//                     method: 'POST',
//                     body: formData,
//                 });
//                 const result=await response.json()

//                 resolve(result);
//             });
//         });
//     }
//     async function run(){
        
//         const result = await waitForFormSubmit()
        
//         console.log(result)
//         flag=result.flag
//         console.log("Flag value:", flag);   
//         console.log("already passWait")
//         console.log("Form submitted!");
//         console.log("Trainee Number:", formData.get('trainee_id'));
//         console.log("Trainee Name:", formData.get('trainee_name'));
//         console.log("Trainee Major:", formData.get('trainee_major'));
//         console.log("Trainee Binusian:", formData.get('trainee_batch'));
//         if (flag == 1) {
//             const response = await fetch("./login")
//             const result=await response.json()
//             print(result)
            
//             window.location.href = '/';
//             console.log("masuk sini")
//             q1.classList.add('active');
//             q1.classList.remove('inactive'); 
//             q2.classList.add('active');
//             q2.classList.remove('inactive');
//         }else{
            
//         }
//     }run()
// }

// function death(){
//     tingnung.play();
// }

setInterval(upTime, 1000);