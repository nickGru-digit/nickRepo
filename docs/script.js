let swords = [];

const cursor = document.getElementById("main");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX - (cursor.offsetWidth - 30) / 2 + "px";
    cursor.style.top = e.clientY - (cursor.offsetHeight - 30) / 2 + "px";
    const sword = document.createElement("div");
    sword.style.pointerEvents = "none";
    sword.classList.add("sword");
    document.body.appendChild(sword);

    sword.style.left = e.clientX - (sword.offsetWidth - 30) / 2 + "px";
    sword.style.top = e.clientY - (sword.offsetHeight - 30) / 2 + "px";

    swords.push(sword);
});
    
setInterval(() => {
    if (swords.length > 0) {
        let sword = swords.shift();
        sword.classList.add("fade");

        setTimeout(() => {
            sword.remove();
        }, 250);
    }
}, 5);