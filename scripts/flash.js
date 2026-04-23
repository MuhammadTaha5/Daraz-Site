let cardFsContent = document.getElementsByClassName("cardFsContent")[0];
let cards =  cardFsContent.querySelectorAll(".cards a");
for(let i =0; i<cards.length; i++)
{
    let fsProductTitle =  cards[i].querySelector("#fsProductTitle").textContent;
    let fsProductPrice = cards[i].querySelector("#fsProductPrice").textContent;
    
    let fsProductImgLink = cards[i].querySelector("#fsProductImgLink").getAttribute("src");
    fsProductImgLink = fsProductImgLink.replace("assets/", "");
    console.log(fsProductImgLink)
    
 cards[i].setAttribute("href", `productPage.html?title=${encodeURIComponent(fsProductTitle)}&price=${fsProductPrice}&img=${fsProductImgLink}`);
cards[i].style.color = "inherit";
cards[i].style.textDecoration = "none";
}

// Function to load and render products
async function loadProducts() {
    try {
        // 1. Fetch the data from your JSON file
        const response = await fetch('assets/data/flashSaleItems.json');
        const products = await response.json();

        const container = document.getElementById('product-container');

        // 2. Map through the data and create HTML strings
        container.innerHTML = products.map(product => `
            <div class="card">
                <a href="product-detail.html?id=${product.id}" class="card-inner">
                    <div class="img">
                        <img src="${product.img}" alt="${product.title}">
                    </div>
                    <div class="cardDetail">
                        <p class="product-title">${product.title}</p>
                        <div class="itemPrice">
                            <p>Rs.<span>${product.price.toLocaleString()}</span></p>
                        </div>
                        <div class="itemPriceDetail">
                            <span style="text-decoration: line-through;">
                                <span class="currency">RS</span>
                                <span class="actualPrice">${product.actualPrice.toLocaleString()}</span>
                            </span>
                            <span class="itemDiscount">${product.discount}</span>
                        </div>
                    </div>
                </a>
            </div>
        `).join(''); // Join the array into one single string

    } catch (error) {
        console.error("Error loading products:", error);
    }
}

// Call the function when the page loads
window.onload = loadProducts;