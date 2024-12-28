const padoru = new Audio("../static/assets/padoru_padoru.mp3"); 
padoru.loop = true;
padoru.volume = 0.05;

document.addEventListener('click', (event) => {
    padoru.play();
});
