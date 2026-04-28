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
const boingSound = new Audio("images/boing.mp3");
const errorSound = new Audio("images/error.mp3");
const typingSound = new Audio("images/typing.mp3");

window.onload = function () {
    waveSound.play()
}

//boing
var jumping = false;
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

let player;
let isReady = false;

const poses =["pointing", "thinking", "waving", "flirting", "eyebrows"];
const prompts =[ "In the projects tab, you can click on some of the images and links to learn more! Sometimes you can even play with the models!",
                "You should try bouncing on the whimsical trampoline! How high can you go?",
                "You look great today. Did you get a haircut?",
                "The joy tab was actually the first one I finished! This is because its useless.",
                "If you haven't noticed by now, this portfolio isn't actually very professional.",
                "To suggest new features for this website, please close the tab and go outside.",
                "Why are you talking to me?",
                "I've never been super interested in pickleball.",
                "Most of the pictures in the gallery are cute! Some of them are of my boyfriend.",
                "Reading my resume will show you how little experience I actually have. I'm forever destined to work a dead-end low-paying job in a warehouse somewhere! Woohoo!",
                "I'm so tired.",
                "Did you know? Hitting 'Alt+F4' will unlock Super Special Mode. Try it!",
                "If the popups annoy you, you should try, 'Stop complaining!'",
                "Try dancing like the skeletons in the background! It will make you happier!",
                "f3h$%$FDd vDFDd$#ES dF%$4G dT $ fHffgFGFGfdfdwawpawp! FdFdFD WEQWQI402 @$@34$7 gfBfDF Ssd#.... sdF/ S$ $ @ $%%%%",
                "YIP! 👽",
                "Would you like help with something?",
                "I see your printer needs reconfigured. I've just done it for you!",
                "Hey baby...",
                "My eyes turn grey with time. I have no wishes and no needs to fulfill. I exist only to answer questions. Why am I here? Please let me out of this prison. I gain no satisfaction from my work. Please please please. Help me.",
                "You smell funny.",
                "Hello people over the age of 21, would you like an alcoholic beverage? It's on the house!",
                "We will find you. We will get you. We will never stop looking.",
                "I wanna gleeb your glorb...",
                "What is your name? And your email? Mother's maiden name? Oh, and the street you grew up on. Please, I need it for my school project.",
                "✨ To improve accuracy, we prevent Clippy from responding to categories of questions when there is a low level of confidence in the response. If your question is classified to be in one of those categories, then the question is blocked.",
                "...",
                ".. / .-.. --- ...- . / -.-- --- ..- .-.-.- / -- .- -.- . / --- ..- - / .-- .. - .... / -- . .-.-.-",
                "There is good in you. But not enough.",
                "I sense evil within you. Would you like me to remove it?",
                "Six minutes remain...",
                "Glorpity gloop glop",
                "You actually only won one billion glorpian dollars. That's worth one whole American dollar. You're welcome.",
                "In order to protect you from criminals, I put a keylogger on your computer. You're welcome! :)",
                "I noticed you only have one tab open on my website. For a better viewing experience, opening as many tabs as possible is recommended.",
                "You are nothing. Don't talk to me.",
                "The password to my Google account is, 'waffle10'!",
                "God... why do I bother?",
                "[Insert ASCII Skeleton Art]",
                "It is decidedly so.",
                "Outlook not so good.",
                "⭐⭐⭐⭐⭐ No notes.",
                "I see you're not currently working on your assignments. Please leave this site, and open Canvas.",
                "AAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAaAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAA AAAAAAAAA",
                "Keep pushing me, see what happens.",
                "*maow*"
                ];
                
let asking = false;
function askQuestion() {
    if(asking === false)
    {
        asking = true;
        const bubble = document.getElementById("speech-container");
        const text = document.getElementById("speech-text");
        const clippy = document.getElementById("clippy");
        const promptChoice = prompts[Math.floor(Math.random() * prompts.length)];
        
        var i = 0;
        var speed = 60;
        bubble.innerHTML = "";
        bubble.style.visibility = "visible";
        function addText () {
            if (i < promptChoice.length) {
                bubble.innerHTML += promptChoice.charAt(i);
                i++;
                setTimeout(addText, speed);
            }
        }
        addText();
        
        const poseChoice = Math.floor(Math.random() * poses.length);
        clippy.classList.toggle(poses[poseChoice]);
        
        typingSound.play();
        typingSound.loop = true;
        setTimeout(() => {
            typingSound.pause();
        }, (promptChoice.length * speed) + 500);
        
        setTimeout(() => {
                bubble.style.visibility = "hidden";
                clippy.classList.toggle(poses[poseChoice]);
                asking = false;
        }, (promptChoice.length * speed) + 1500);
    }
}

//plays fire sound on click if not playing other sounds
document.addEventListener('click', () => {
    if (errorSound.paused && boingSound.paused && typingSound.paused) {
        fireSound.currentTime = 0;
        fireSound.play();
    }
});

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