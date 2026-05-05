export function renderMoreProducts(products){
    const displayProducts = document.getElementById("storeProducts");
    if(!products){
        return
    }
    for(let product of products){
        displayProducts.innerHTML += `
            <div class="col me-1">
              <div class="card">
                <a href="productPage.html?id=${product.id}" style="color:inherit;text-decoration:none;">
                  <div class="img">
                    <img src="assets/products/${product.link}" alt="${product.title}">
                  </div>
                  <div class="cardDetail">
                    <p>${product.title}</p>
                    <div class="itemPrice" style="display:flex;gap:4px;">
                      <p>RS.${product.price}</p>
                      <span class="itemDiscount" style="color:grey!important;position:relative;top:4px;">${product.discount}</span>
                    </div>
                    <div class="productRating">
                      <span>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                      </span>
                      <span class="comments">${product.comments}</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>`;

    }
}