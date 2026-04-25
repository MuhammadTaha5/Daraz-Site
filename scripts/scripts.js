//Empty Products array to store products
let products = [];
//async function to load products store in json file.
// a separate file is created to hold the data of 20-25 products and fetch method is used to get the products and 
// convert into json object
async function loadProducts() //method to load the products
{
    const res = await fetch("assets/data/products.json");
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
                                <img src="assets/products/${product["link"]}" alt="">
                            </div>
                            <div class="cardDetail">
                                <p>${product["title"]}</p>
                                <div class="itemPrice" style="display: flex; gap: 4px;">
                                    <p>RS.${product["price"]}</p>
                                    <span class="itemDiscount" style="color: grey !important; position: relative; top: 2px;">${product["discount"]}</span>
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


let loadProductsButton = document.getElementById("loadProductsButton");
if (loadProductsButton) {
    loadProductsButton.addEventListener("click", (e) => {
        e.preventDefault()
        
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

