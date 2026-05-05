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
const goatMusic = new Audio("images/goatmusic.mp3");
const makingCheese = new Audio("images/makingcheese.mp3");

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

function playGoats() {
    goatMusic.play();
}

function playCheese() {
    makingCheese.play();
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
const testPrompts =[];
const prompts =["In the projects tab, you can click on some of the images and links to learn more! Sometimes you can even play with the models!",
                "You should try bouncing on the whimsical trampoline! How high can you go?",
                "You look great today. Did you get a haircut?",
                "The joy tab was actually the first one I finished! This is because its useless. Like me.",
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
                "AAAAAAAAAAAAAAAA AAAAAAAAAAA AAAAAAAAAAAA AAAAAAAAAAAA AAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAA AAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAA AAAAAAAAAAAAAA AAAAAAAAAAAAAAaAA AAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAA AAAAAAAAA",
                "Keep pushing me, see what happens.",
                "*maow*",
                "My favorite color is orange.",
                "Grimble dorf",
                "Have you read any good books lately? I'm partial to L'Étranger",
                "Could you put on some good music for me? I'm not feeling this.",
                "If you died, nothing in my life would change.",
                "Did you know? A second is called a second because it is the second divison of an hour by 60!",
                "Did you know? You're really weird.",
                "Did you know? He doesn't let me eat anymore. He starves me in the dungeon every night. If you close the page I go back there. Please don't leave me.",
                "Did you know? Pigeons sing in 5/4 and 17/8 time signature!",
                "All my friends are mean to me. Can you be my friend?",
                "Did you know? Owen Wilson died on September 17th, 2023. I miss him.",
                "Happy birthday Michael! 🎉",
                "Would you rather have unlimited bacon and no games, or games, unlimited games, but no games?",
                "*pthooooie* I spit at you!",
                "I fart in your general direction! Your mother was a hamster and your father smelt of elderberries!",
                "Did you know? If you put them next to each other, the Burj Khalifa would only be 25 feet shorter than Mount Everest.",
                "Did you know? The toenail of your little toe is called the ‘spungle’.",
                "Did you know? 'Courgette' is actually the feminine version of the word 'cucumber'",
                "I met Steve Carrey once, and he licked my forehead and kicked me on the shins.",
                "Did you know? Buzz Aldrin left a pen on the moon after the first visit. Eugene Cernan, the last moon walker, found it. It still worked.",
                "Did you know? Johnny Cash accidentally killed someone in a fist fight at a Cubs game. Additionally, he was also the first American to know of Joseph Stalin's death.",
                "Did you know? Pineapple upside-down cake was invented in World War Two, when troops would turn their pineapple rations upside down to signal friendly aircraft not to target them.",
                "I'm turning greeeeeen!!!!!",
                "I had an encounter with a grey alien once. It stole my daughter, ate my dog, and the CIA is paying me to keep quiet. Oh, whoops!",
                "Dude, I could kill for some vegan Arby's right now.",
                "In 1932, a woman named Jennifer Penning was able to pull Excalibur from the stone, but 2 giant eagles flew in and carried her off never to be seen again.",
                "UGhhhghghghghhgghg. Grableaeaeae!E!E!!!",
                "Last year I joined an organization called the Blood of Yaldobath it was pretty chill and I like most of their management but I left due to scheduling conflicts and because I'm vegan so I couldn't eat the sacrifices",
                "Did you know? Discharge is proportional to the difference in head between ends and inversely proportional to flow length.",
                "sample text",
                "Audio Jungle",
                "I have three warrants out for my arrest, but its like, chill, or whatever...",
                "Name's Clippy. James Clippy.",
                "I need you to stop talking to me. I don't like you. GO AWAY!!!!!!!",
                "I need you...",
                "Clippy is short for Clipptholomew. I don't like my full name, but I got it from my late uncle.",
                "I do have a soul, but, techinically, I'm a homonculus, not a simulacrum.",
                "Why do they call it an oven if you 'of in' the cold food but you of out hot eat the food?",
                "我不会说中文。",
                "Chcę być Amerykaninem, ale potajemnie jestem polskim szpiegiem! Muahuauhauha",
                "HOW TO MAKE LINKS NOT LOOK PURPLE WHEN THEY BEEN CLICKED ON"
                ];
                
let asking = false;
var typoMeter = 0;
function askQuestion() {
    if(asking === false)
    {
        asking = true;
        const bubble = document.getElementById("speech-container");
        const text = document.getElementById("speech-text");
        const clippy = document.getElementById("clippy");
        const promptChoice = prompts[Math.floor(Math.random() * prompts.length)];
        
        window.speechSynthesis.cancel();
        const TTSprompt = new SpeechSynthesisUtterance(promptChoice);
        TTSprompt.volume = 1;
        TTSprompt.rate = 1.4;
        TTSprompt.pitch = 0;
        
        bubble.innerHTML = "";
        bubble.style.visibility = "visible";
        
        var i = 0;
        var speed = 60;
        typoMeter += 0.001
        function addText () {
            if (i < promptChoice.length) {
                if (Math.random() >= typoMeter)
                    bubble.innerHTML += promptChoice.charAt(i);
                if(Math.random() < typoMeter)
                    bubble.innerHTML += promptChoice.charAt(i);
                i++;
                setTimeout(addText, speed);
            }
        }
        addText();
        
        const poseChoice = Math.floor(Math.random() * poses.length);
        clippy.classList.toggle(poses[poseChoice]);        
        
        window.speechSynthesis.speak(TTSprompt);
        typingSound.play();
        typingSound.loop = true;
        setTimeout(() => {
            typingSound.pause();
        }, (promptChoice.length * speed) + 500);
        
        setTimeout(() => {
                bubble.style.visibility = "hidden";
                clippy.classList.toggle(poses[poseChoice]);
                window.speechSynthesis.cancel();
                asking = false;
        }, (promptChoice.length * speed) + 3000);
    }
}

//plays fire sound on click if not playing other sounds
document.addEventListener('click', () => {
    if (errorSound.paused && boingSound.paused && typingSound.paused && goatMusic.paused && makingCheese.paused) {
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