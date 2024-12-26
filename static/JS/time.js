const display = document.getElementById('time');
const navdis = document.getElementById('time-clock');
document.createElement
let nexta = nextAlarm(); 
const tingnung = new Audio("../static/assets/death.mp3"); 
tingnung.loop = true;
i=0
function upTime() {
    const date = new Date();

    const hour = String(date.getHours()).padStart(2, '0'); 
    const min = String(date.getMinutes()).padStart(2, '0'); 
    const sec = String(date.getSeconds()).padStart(2, '0');

    // Ivy, gw komen soalnya ini bikin error tadi
    // display.xinnerText = `${hour} : ${min} : ${sec}`;

    navdis.innerText = `${hour} : ${min} : ${sec}`;
    i++
    console.log(i)
    if (trimin(date) || i%10==0) {
        
        pop();
        tingnung.play();
        nexta = nextAlarm(); 
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
    const q1= document.getElementById('quiz1');
    const q2 = document.getElementById('quiz2');
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
// function death(){
//     tingnung.play();
// }



setInterval(upTime, 1000);

