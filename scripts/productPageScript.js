// Get ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");


// Fetch JSON file
fetch("assets/data/products.json")
  .then(res => res.json())
  .then(data => {

    // Find product by ID
    const product = data.find(item => item.id == productId);

    if (!product) {
      console.error("Product not found");
      return;
    }

    // Update main UI
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

  })
  .catch(err => console.error("Error loading products:", err));
document.getElementById("arrowLeft").addEventListener("click", () => {
  console.log("hello")
  const container = document.getElementById("thumbContainer");
  console.log("Scroll clicked");
  container.scrollLeft += -1 * 150;
})
document.getElementById("arrowRight").addEventListener("click", () => {
  console.log("hello")
  const container = document.getElementById("thumbContainer");
  console.log("Scroll clicked");
  container.scrollLeft += 1 * 150;
})

window.changeImage = function (img) {
  document.getElementById("mainProductImg").src = img.src;

}
let mainProductImg = document.getElementById("mainProductImg");

let optionImagesVartants = document.getElementById("optionImagesVartants");
let optionimgs = optionImagesVartants.querySelectorAll("img");

for (let i = 0; i < optionimgs.length; i++) {
  optionimgs[i].addEventListener("mouseover", () => {
    mainProductImg.setAttribute("src", optionimgs[i].getAttribute("src"))
  })
}

let productQuantity = document.getElementById("productQuantity")
let minus = document.getElementById("minus")
let add = document.getElementById("add")

add.addEventListener("click", () => {
  valueQuantity = parseInt(productQuantity.value) + 1
  productQuantity.value = valueQuantity;
})

minus.addEventListener("click", () => {

  if (productQuantity.value > 1) {
    valueQuantity = parseInt(productQuantity.value) - 1
    productQuantity.value = valueQuantity;

  }
})

document.getElementById("mainProductImg").addEventListener("mouseover", () => {
  imageZoom("mainProductImg", "myresult");
})
function imageZoom(imgID, resultID) {

  var img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  /* Create lens: */
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");
  /* Insert lens: */
  img.parentElement.insertBefore(lens, img);
  /* Calculate the ratio between result DIV and lens: */
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;
  /* Set background properties for the result DIV */
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
  /* Execute a function when someone moves the cursor over the image, or the lens: */
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  /* And also for touch screens: */
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  img.addEventListener("mouseleave", () => {
    document.querySelector(".img-zoom-result").style.visibility = "hidden";
  })
  function moveLens(e) {
    document.querySelector(".img-zoom-result").style.visibility = "visible";
    var pos, x, y;
    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault();
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(e);
    /* Calculate the position of the lens: */
    x = pos.x - (lens.offsetWidth / 2);
    y = pos.y - (lens.offsetHeight / 2);
    /* Prevent the lens from being positioned outside the image: */
    if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
    if (x < 0) { x = 0; }
    if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
    if (y < 0) { y = 0; }
    /* Set the position of the lens: */
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    /* Display what the lens "sees": */
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }
  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }


}


function applyZoomFunctionality() {
  document.querySelectorAll('.review-block').forEach(block => {
    const zoomThumbs = block.querySelectorAll('.zoom-thumb');
    const zoomFull = block.querySelector('.zoom-full');
    const zoomFullImg = block.querySelector('.zoom-full img');

    zoomThumbs.forEach(thumb => {
      thumb.addEventListener('click', function () {
        const img = this.querySelector('img');
        const isSame =
          zoomFullImg.src === img.src && zoomFull.classList.contains('active');

        zoomThumbs.forEach(t => t.classList.remove('active'));

        if (isSame) {
          zoomFull.classList.remove('active');
          zoomFullImg.src = '';
        } else {
          this.classList.add('active');
          zoomFullImg.src = img.src;
          zoomFull.classList.add('active');
        }
      });
    });
  });
}


const reviewsPerPage = 3;
let currentPage = 1;
let reviewsData = [];

// Fetch JSON
fetch('assets/data/reviews.json')
  .then(res => res.json())
  .then(data => {
    reviewsData = data;
    renderReviews();
    renderPagination();
  });

// Render Reviews
function renderReviews() {
  const container = document.getElementById("reviewsContainer");
  container.innerHTML = "";

  const start = (currentPage - 1) * reviewsPerPage;
  const end = start + reviewsPerPage;
  const currentReviews = reviewsData.slice(start, end);

  currentReviews.forEach(review => {
    const stars = generateStars(review.rating);

    let imagesHTML = '';
    if (review.images && review.images.length > 0) {
      imagesHTML = `
        <div class="zoom-imgs">
          ${review.images.map(img => `
            <div class="zoom-thumb">
              <img src="${img}" alt="">
              <span class="zoom-arrow"></span>
            </div>
          `).join('')}
        </div>
        <div class="zoom-full">
          <img src="" alt="">
        </div>
      `;
    }

    const reviewHTML = `
      <div class="productReview review-block">
        <div class="eachReviewHead">
          <div>
            <div class="ratingStar">
              ${stars}
            </div>
            <div class="reviewerName">
              <span>${review.username}</span>
              ${review.verified ? `
                <span>
                  <i class="fa-solid fa-shield"></i>
                  <p>Verified Purchase</p>
                </span>` : ''}
            </div>
          </div>
          <div class="reviewDate">${review.date}</div>
        </div>

        <div class="reviewMaterial">
          <pre>${review.comment}</pre>

          ${imagesHTML}

          <div class="likesAndColor">
            <div>
              <span>Color Family:</span>
              <span>${review.colorFamily}</span>
            </div>
            <div>
              <i class="fa-regular fa-thumbs-up"></i>
              <span class="likes">${review.likes}</span>
            </div>
          </div>
        </div>
      </div>

      <hr class="reviewDivider">
    `;

    container.innerHTML += reviewHTML;
  });

  // ✅ THIS LINE FIXES EVERYTHING
  applyZoomFunctionality();
}// Generate Stars
function generateStars(rating) {
  let stars = '';
  for (let i = 0; i < 5; i++) {
    stars += `<i class="fa-solid fa-star ${i < rating ? '' : 'inactive'}"></i>`;
  }
  return stars;
}

// Pagination
function renderPagination() {
  const totalPages = Math.ceil(reviewsData.length / reviewsPerPage);
  const pagination = document.getElementById("pagination");

  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <button class="page-btn ${i === currentPage ? 'active' : ''}" 
        onclick="changePage(${i})">${i}</button>
    `;
  }
}

function changePage(page) {
  currentPage = page;
  renderReviews();
  renderPagination();
}

function updateHeaderHeight() {
  const header = document.getElementById("mainHeader");
  if (header) {
    document.documentElement.style.setProperty(
      "--header-height",
      header.offsetHeight + "px"
    );
  }
}

// Run at correct times
window.addEventListener("load", updateHeaderHeight);
window.addEventListener("resize", updateHeaderHeight);

// Extra safety (Bootstrap/navbar changes after load)
setTimeout(updateHeaderHeight, 300);