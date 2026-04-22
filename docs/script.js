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
const bubbleSound = new Audio("images/bubbles.mp3");

document.addEventListener('click', () => {
    fireSound.currentTime = 0;
    fireSound.play();
});

window.onload = function() {
    bubbleSound.play()
}
