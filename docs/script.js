//let swords = [];
//
//const cursor = document.getElementById("main");
//
//document.addEventListener("mousemove", (e) => {
//    cursor.style.left = e.clientX + "px";
//    cursor.style.top = e.clientY + "px";
//    cursor.style.pointerEvents = "none";
//    
//    const sword = document.createElement("div");
//    sword.style.pointerEvents = "none";
//    sword.style.backgroundImage = "url('images/backupPointer.png')";
//    
//    sword.classList.add("sword");
//    document.body.appendChild(sword);
//
//    sword.style.left = e.clientX + "px";
//    sword.style.top = e.clientY + "px";
//
//    swords.push(sword);
//});
//    
//setInterval(() => {
//    if (swords.length > 0) {
//        let sword = swords.shift();
//        sword.classList.add("fade");
//
//        setTimeout(() => {
//            sword.remove();
//        }, 250);
//    }
//}, 20);
window.onload = function() {
    bubbleSound.play()
}

const fireSound = new Audio("images/fire.mp3");
const bubbleSound = new Audio("images/bubbles.mp3");

var jumping = false;
const boingSound = new Audio("images/boing.mp3");
function jump() {
    trampoline = document.getElementById("jumping");
    trampoline.style.transition = "transform 1.25s ease";
    if (jumping == false) 
    { 
        jumping = true;
        boingSound.play();
        trampoline.style.transform = "scale(1.5)";
        setTimeout(() => {trampoline.style.transform = "scale(0.25)";}, 400);
        setTimeout(() => {trampoline.style.transform = "scale(1)";}, 1700);
        setTimeout(() => {jumping = false;}, 2500);
    }
}

const errorSound = new Audio("images/error.mp3");
var delay = 30;
function freakout() {
    popup = document.getElementById("popup");
    const randomDegree = Math.floor(Math.random() * 20);
    const oppDegree = -randomDegree;
    
    errorSound.currentTime = 0;
    errorSound.playbackRate = Math.random() * 0.75 + 1;
    errorSound.preservesPitch = false;
    errorSound.play();
    
    popup.style.animationPlayState = "paused";
    delay -= 1.5;
    popup.style.animationDelay = `${delay}s`;
    popup.style.animationPlayState = "running";
    
    popup.style.transition = "transform 0.125s ease";
    popup.style.filter = "hue-rotate(135deg) blur(2px)";
    popup.style.transform = `rotate(${randomDegree}deg)`;
    setTimeout(() => {popup.style.transform =`rotate(${oppDegree}deg)`}, 125);
    setTimeout(() => {popup.style.transform ="rotate(0deg)"}, 250);
    setTimeout(() => {popup.style.filter = "hue-rotate(0deg) blur(0px)"}, 250);
}

document.addEventListener('click', () => {
    if (errorSound.paused && boingSound.paused)
    {
        fireSound.currentTime = 0;
        fireSound.play();
    }
});

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',   // hide video if you want audio-only feel
        width: '0',
        videoId: '',
        playerVars: {
            autoplay: 0,
            controls: 0
        }
    });
}

function getVideoId(url) {
    let match = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : null;
}

function loadVideo() {
    let url = document.getElementById("ytInput").value;
    let videoId = getVideoId(url);

    if (videoId && player) {
        player.loadVideoById(videoId);
    } else {
        alert("Invalid YouTube URL");
    }
}
