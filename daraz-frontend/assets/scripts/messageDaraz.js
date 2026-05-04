
let messageNowButton = document.getElementsByClassName("messageNow")[0];
let closeMessage = document.getElementById("closeMessage");
let messageBoxToggle = document.getElementById("messageBoxToggle");
if (messageNowButton) {
    messageNowButton.addEventListener("click", () => {
        messageBoxToggle.classList.add("openBox");
        messageBoxToggle.classList.remove("closeBox")
        setTimeout(() => {
            messageBoxToggle.style.display = "flex";
            messageNowButton.style.display = "none";
        }, 300);
    })
}
if (closeMessage) {
    closeMessage.addEventListener("click", () => {


        messageBoxToggle.classList.add("closeBox");
        messageBoxToggle.classList.remove("openBox")
        setTimeout(() => {
            messageBoxToggle.style.display = "none";
            messageNowButton.style.display = "flex";
        }, 300); // same as animation duration

    });
}

