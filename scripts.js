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
//function to display product on main page
let displayProducts = document.getElementById("storeProducts");

async function init() {
    products = await loadProducts();
    products.forEach(product => {
        //changing the inner html
        displayProducts.innerHTML += `<div class="col">
                    <div class="card">
                        <a href="#" style="color: inherit; text-decoration: none;">
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

init();
//making function call
