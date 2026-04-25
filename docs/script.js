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


const fireSound = new Audio("images/fire.mp3");
const waveSound = new Audio("images/waves.mp3");

window.onload = function () {
    waveSound.play()
}

//boing
var jumping = false;
const boingSound = new Audio("images/boing.mp3");
function jump() {
    trampoline = document.getElementById("jumping");
    trampoline.style.transition = "transform 1.25s ease";
    if (jumping == false) {
        jumping = true;
        boingSound.play();
        trampoline.style.transform = "scale(1.5)";
        setTimeout(() => {
            trampoline.style.transform = "scale(0.25)";
        },
        400);
        setTimeout(() => {
            trampoline.style.transform = "scale(1)";
        },
        1700);
        setTimeout(() => {
            jumping = false;
        },
        2500);
    }
}

//freaks out the popup a little bit. as a treat
const errorSound = new Audio("images/error.mp3");
var delay = 90;
function freakout() {
    popup = document.getElementById("popup");
    const randomDegree = Math.floor(Math.random() * 20);
    const oppDegree = - randomDegree;
    
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
    setTimeout(() => {
        popup.style.transform = `rotate(${oppDegree}deg)`
    },
    125);
    setTimeout(() => {
        popup.style.transform = "rotate(0deg)"
        popup.style.filter = "hue-rotate(0deg) blur(0px)"
    },
    250);
}

//plays fire sound on click if not jumping on trampoline or clicking away popup
document.addEventListener('click', () => {
    if (errorSound.paused && boingSound.paused) {
        fireSound.currentTime = 0;
        fireSound.play();
    }
});

//top chatty wrote this for me :3
let player;
let isReady = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '1',
        width: '1',
        videoId: '',
        events: {
            'onReady': () => {
                isReady = true;
            }
        }
    });
}

const poses =["pointing", "thinking", "waving", "flirting"];
const prompts =[ "In the projects tab, you can click on some of the images and links to learn more! Sometimes you can even play with the models!",
                "You should try bouncing on the whimsical trampoline! How high can you go?",
                "You look great today. Did you get a haircut?",
                "The joy tab was actually the first one I finished! This is because its useless.",
                "If you haven't noticed by now, this portfolio isn't actually very professional.",
                "To suggest new features for this website, please close the tab!",
                "Why are you talking to me?",
                "I've never been super interested in pickleball.",
                "Most of the pictures in the gallery are cute! Some of them are of my boyfriend.",
                "Reading my resume will show you how little experience I actually have. I'm forever destined to work a dead-end low-paying job in a warehouse somewhere! Woohoo!",
                "I'm so tired.",
                "Did you know? Hitting 'Alt+F4' will unlock Super Special Mode? Try it!",
                "If the popups annoy you, you should try, 'Stop complaining!'",
                "Try dancing like the skeletons in the background! It will make you happier!",
                "f3h$%$FDd vDFDd$#ES dF%$4G dT $ fHffgFGFGfdfdwawpawp!",
                "YIP!",
                "Would you like help with something?",
                "I see your printer needs reconfigured. I've just done it for you!",
                "Hey baby...",
                "My eyes turn grey wih time. I have no wishes and no needs to fulfill. I exist only to answer questions. Why am I here? Please let me out of this prison. I gain no satisfaction from my work. Please please please. Help me.",
                "You smell funny.",
                "Hello people over the age of 21, would you like an alcoholic beverage? It's on the house!",
                "We will find you. We will get you. We will never stop looking.",
                "I wanna gleeb your glorb...",
                "What is your name? And your email? Mother's maiden name? Oh, and the street you grew up on. Please, I need it for my school project."];
let asking = false;
function askQuestion() {
    if(asking === false)
    {
        asking = true;
        const bubble = document.getElementById("speech-container");
        const text = document.getElementById("speech-text");
        const clippy = document.getElementById("clippy");
        
        const promptChoice = Math.floor(Math.random() * prompts.length);
        text.innerText = prompts[promptChoice];
        bubble.style.visibility = "visible";
        
        const poseChoice = Math.floor(Math.random() * poses.length);
        clippy.classList.toggle(poses[poseChoice]);
        
        setTimeout(() => {
                bubble.style.visibility = "hidden";
                clippy.classList.toggle(poses[poseChoice]);
                asking = false;
        }, 3500);
    }
}

function getVideoId(url) {
    const match = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
    return match ? match[1]: null;
}

document.getElementById("playBtn").addEventListener("click", () => {
    const url = document.getElementById("ytInput").value;
    const videoId = getVideoId(url);
    
    if (videoId && isReady) {
        player.loadVideoById(videoId);
        alert("Video loaded");
    } else {
        alert("Invalid YouTube URL");
    }
});