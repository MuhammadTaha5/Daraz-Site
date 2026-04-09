//Empty Products array to store products
let products = [];
//async function to load products store in json file.
// a separate file is created to hold the data of 20-25 products and fetch method is used to get the products and 
// convert into json object
async function loadProducts() //method to load the products
{
    const res = await fetch("assets/products.json");
    const data = await res.json();
    return data;
}
function getPosition(pos) {
    let navigatorMain = document.getElementsByClassName("navigatorMain")[0];
    let getRegion = navigatorMain.querySelector(`#${pos}`)
    console.log(getRegion)
}

window.onscroll = function () {
    document.getElementById("spacer").style.display =
        window.scrollY > 50 ? "none" : "block";
};
//function to display product on main page
let displayProducts = document.getElementById("storeProducts");



async function init() {
    products = await loadProducts();

    products.forEach(product => {
        //changing the inner html
        displayProducts.innerHTML += `<div class="col">
                    <div class="card">
                         <a href="productPage.html?title=${encodeURIComponent(product["title"])}&price=${product["price"]}&img=${product["link"]}" style="color: inherit; text-decoration: none;">
                            <div class="img">
                                <img src="assets/${product["link"]}" alt="">
                            </div>
                            <div class="cardDetail">
                                <p>${product["title"]}</p>
                                <div class="itemPrice" style="display: flex; gap: 4px;">
                                    <p>RS.${product["price"]}</p>
                                    <span class="itemDiscount" style="color: grey !important; position: relative; top: 4px;">${product["discount"]}</span>
                                </div>
                                <div class="productRating">
                                    <span>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                    </span>
                                    <span class="comments">${product["comments"]}</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>`
    });

}
try {
    init();
} catch (error) {
    console.log(error)
}
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
let showPassword = document.getElementsByClassName("fa-eye")[0];
showPassword.style.cursor = "pointer";
showPassword.addEventListener("click", () => {
    let password = showPassword.parentElement.querySelector("#loginPassword");
    if (password.type == "password") {
        password.type = "text";
    }
    else {
        password.type = "password"
    }

})


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


let loadProductsButton = document.getElementById("loadProductsButton");
if (loadProductsButton) {
    loadProductsButton.addEventListener("click", () => {
        fetch("assets/products.json")
            .then((data) => data.json())
            .then((addProducts) => {
                for (let i = 0; i <= 5; i++) {
                    displayProducts.innerHTML += `<div class="col">
                    <div class="card">
                        <a href="productPage.html?title=${encodeURIComponent(addProducts[i]["title"])}&price=${addProducts[i]["price"]}&img=${addProducts[i]["link"]}" style="color: inherit; text-decoration: none;">
                            <div class="img">
                                <img src="assets/${addProducts[i]["link"]}" alt="">
                            </div>
                            <div class="cardDetail">
                                <p>${addProducts[i]["title"]}</p>
                                <div class="itemPrice" style="display: flex; gap: 4px;">
                                    <p>RS.${addProducts[i]["price"]}</p>
                                    <span class="itemDiscount" style="color: grey !important; position: relative; top: 4px;">${addProducts[i]["discount"]}</span>
                                </div>
                                <div class="productRating">
                                    <span>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                    </span>
                                    <span class="comments">${addProducts[i]["comments"]}</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>`

                }

            })

    })

}

