
//making function call

let loginEmailSection = document.getElementById("loginWithEmailSection")
let loginPhoneSection = document.getElementById("loginwithPhone")

let emailLoginButton = document.getElementById("emailLoginButton")
let phoneLoginButton = document.getElementById("phoneLoginButton")

emailLoginButton.addEventListener("click", () => {
    loginEmailSection.style.display = "flex";
    loginPhoneSection.style.display = "none";
    emailLoginButton.className = "active";
    phoneLoginButton.className = "inactive";

})


phoneLoginButton.addEventListener("click", () => {
    loginEmailSection.style.display = "none";
    loginPhoneSection.style.display = "flex";
    emailLoginButton.className = "inactive";
    phoneLoginButton.className = "active";


})

let loginwithEmailSection = document.getElementById("loginWithEmailSection");
loginwithEmailSection.addEventListener("submit", (e) => {
    e.preventDefault();
    let loginEmail = loginwithEmailSection.querySelector("#loginEmail").value;
    let loginPassword = loginwithEmailSection.querySelector("#loginPassword").value;
    if (!loginPassword || !loginEmail) {
        showError("Enter Valid Email Password", "errorBoxLogin")
        console.log("eror")

    }
    if (!loginPassword) {
        loginwithEmailSection.querySelector("#passwordFeedback").style.display = "block";

    }



})
let loginwithPhone = document.getElementById("loginwithPhone");
loginwithPhone.addEventListener("submit", (e) => {
    e.preventDefault();
    let phoneNumber = document.getElementById("phoneNumber");
    if (!phoneNumber.value) {
        showError("Enter a valid Phone number", "errorBoxLogin");
    }
})

let signupPhone = document.getElementById("signUpPhone");
// console.log(signupPhone)
signupPhone.addEventListener("submit", (e) => {
    e.preventDefault();
    let signUpPhoneInput = document.getElementById("signUpPhoneInput");
    if (!signUpPhoneInput.value || signUpPhoneInput.value == "") {
        console.log(signUpPhoneInput.value);
        showError("Enter Valid  a Phone Number", "errorBoxSignUp");
    }
    let checkboxPrivacyPolicy = document.getElementById("checkboxPrivacyPolicy");
    if (!checkboxPrivacyPolicy.checked) {
        showError("Please Check the Privacy policy and Terms and conditions", "errorBoxSignUp");
    }
})

function showError(m, node) {
    const messageBox = document.getElementById(node);
    console.log(messageBox.parentElement)
    console.log(messageBox)
    const duration = 2000;

    let msg = messageBox.querySelector("#msg");
    console.log(msg)
    msg.innerHTML = m;
    console.log(msg)
    messageBox.classList.remove('hidden');


    // 2. Set a timeout to start the fade-out effect
    setTimeout(function () {
        messageBox.classList.add('fade-out');
    }, duration);


    setTimeout(function () {
        messageBox.classList.add('hidden');
        messageBox.classList.remove('fade-out'); // Reset for next time
    }, duration + 500); // 3000ms duration + 500ms transition
}
let showPassword = document.getElementById("showPass");

showPassword.style.cursor = "pointer";

showPassword.addEventListener("click", () => {
    let password = document.getElementById("loginPassword"); // more reliable

    if (password.type === "password") {
        password.type = "text";
        showPassword.src = "assets/icons/open-eye.png";  
    } else {
        password.type = "password";
        showPassword.src = "assets/icons/eyebrow.png";   
    }
});


const btnSave = document.getElementById("popoverBtnSave")

new bootstrap.Popover(btnSave, {
    html: true,
    trigger: "focus",
    content: document.getElementById("popoverContentSave").innerHTML
})
const btnHelp = document.getElementById("popoverBtnHelp")

new bootstrap.Popover(btnHelp, {
    html: true,
    trigger: "focus",
    content: document.getElementById("popoverContentHelp").innerHTML
})
const btnlanguage = document.getElementById("popoverBtnLanguage")

new bootstrap.Popover(btnlanguage, {
    html: true,
    trigger: "focus",
    content: document.getElementById("popoverContentLanguage").innerHTML
})

