const display = document.getElementById('time');
const navdis = document.getElementById('time-clock');
let nexta = nextAlarm(); 
const tingnung = new Audio("../static/assets/death.mp3"); 
tingnung.loop = true;

function upTime() {
    const date = new Date();

    const hour = String(date.getHours()).padStart(2, '0'); 
    const min = String(date.getMinutes()).padStart(2, '0'); 
    const sec = String(date.getSeconds()).padStart(2, '0');

    // Ivy, gw komen soalnya ini bikin error tadi
    // display.innerText = `${hour} : ${min} : ${sec}`;
    navdis.innerText = `${hour} : ${min} : ${sec}`;

    if (trimin(date)) {
        pop(); 
        nexta = nextAlarm(); 
        tingnung.play();
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

function pop() {
    const popup = document.getElementById('bangunPop');
    popup.classList.add('active');
}

function popout() {
    const popup = document.getElementById('bangunPop');
    popup.classList.remove('active');
    tingnung.loop = false;
}

// function death(){
//     tingnung.play();
// }

setInterval(upTime, 1000);

