export function renderFlashSale(flashProducts) {
    const container = document.getElementById("product-container");
    if (!container) return; // not on a page with flash sale

    container.innerHTML = "";
    container.innerHTML = flashProducts
        .map(
            (product) => `
      <div class="card">
        <a href="productPage.html?id=${product['_id']}" class="card-inner">
          <div class="img">
            <img src="assets/products/${product.link}" alt="${product.title}">
          </div>
          <div class="cardDetail">
            <p class="product-title">${product.title}</p>
            <div class="itemPrice">
              <p>Rs.<span>${product.price}</span></p>
            </div>
            <div class="itemPriceDetail">
              <span>
                <span class="currency">RS</span>
                <span class="actualPrice">${product.actualPrice}</span>
              </span>
              <span class="itemDiscount">${product.discount}</span>
            </div>
          </div>
        </a>
      </div>`
        )
        .join("");


}
