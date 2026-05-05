export function renderProductDetails(prod){
    const product = prod;

    if (!product) {
      console.error("Product not found");
      return;
    }
    // Update main UI
    document.title = product.title;
    document.querySelector("#productName").textContent = product.title;
    document.querySelector("h1#productName").textContent = product.title;
    document.getElementById("mainProductImg").src = "assets/products/" + product.link;
    document.getElementById("discPrice").textContent = "Rs. " + product.price;


    // ✅ Dynamic related images (variants)
    const variantsContainer = document.getElementById("optionImagesVartants");
    variantsContainer.innerHTML = ""; // clear old static HTML

    product.relatedImage.forEach(img => {
      const image = document.createElement("img");
      image.src = "assets/products/" + img;
      image.alt = product.title;

      // optional: click to change main image
      image.style.cursor = "pointer";
      image.addEventListener("click", () => {
        document.getElementById("mainProductImg").src = image.src;
      });

      variantsContainer.appendChild(image);
    });
    // Product details section (UL)
    const specsContainer = document.querySelector(".product-specs");
    const productTitleHeading = document.querySelector(".productTextDetail h2");

    // Optional: update heading
    productTitleHeading.textContent = "Product details of " + product.title;

    // Clear old static list
    specsContainer.innerHTML = "";

    // Add dynamic list items
    product.productDetails.forEach(detail => {
      const li = document.createElement("li");
      li.textContent = detail;
      specsContainer.appendChild(li);
    });


}