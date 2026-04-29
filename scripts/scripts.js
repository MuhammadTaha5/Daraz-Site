
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
    document.title = 'Online Shopping in Pakistan: Fashion, Electronics & Groceries'
    products = await loadProducts();

    products.forEach(product => {
        //changing the inner html
        displayProducts.innerHTML += `<div class="col m-1">
                    <div class="card">
                         <a href="productPage.html?id=${product["id"]}" style="color: inherit; text-decoration: none;">
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
        
        fetch("assets/data/products.json")
            .then((data) => data.json())
            .then((addProducts) => {
                for (let i = 0; i <= 5; i++) {
                    displayProducts.innerHTML += `<div class="col m-1">
                    <div class="card">
                        <a href="productPage.html?id=${addProducts[i]["id"]}" style="color: inherit; text-decoration: none;">
                            <div class="img">
                                <img src="assets/products/${addProducts[i]["link"]}" alt="">
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


window.addEventListener('scroll', function () {
    const nav = document.querySelector('.navigatorMain');

    if (window.scrollY > 200) { // adjust this value
        nav.classList.add('show');
    } else {
        nav.classList.remove('show');
    }
});
const sections = [
  { sectionId: 'flashSale', navId: 'flashSale' },
  { sectionId: 'categories', navId: 'category' },
  { sectionId: 'just-for-you', navId: 'justForYou' }
];

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const match = sections.find(s => s.sectionId === entry.target.id);
    if (!match) return;

    const navEl = document.getElementById(match.navId);
    if (entry.isIntersecting) {
      navEl.classList.add('active');
    } else {
      navEl.classList.remove('active');
    }
  });
}, observerOptions);

sections.forEach(({ sectionId }) => {
  const el = document.getElementById(sectionId);
  if (el) observer.observe(el);
});