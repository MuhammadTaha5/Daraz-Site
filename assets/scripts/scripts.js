
/** Inject an HTML component into a selector. */
function loadComponent(selector, url) {
  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load component: ${url}`);
      return res.text();
    })
    .then((html) => {
      const el = document.querySelector(selector);
      if (el) el.innerHTML = html;
    });
}

/** Append a <script> tag and resolve when it has fully loaded. */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const tag = document.createElement("script");
    tag.src = src;
    tag.onload = resolve;
    tag.onerror = () => reject(new Error(`Script failed to load: ${src}`));
    document.body.appendChild(tag);
  });
}

/** Load an array of scripts one-by-one (sequential, not parallel). */
function loadScriptsSequentially(scripts) {
  return scripts.reduce(
    (chain, src) => chain.then(() => loadScript(src)),
    Promise.resolve()
  );
}

/* ─── 2. PRODUCTS (index page) ───────────────────────────── */

let products = [];
const displayProducts = document.getElementById("storeProducts");

async function loadProducts() {
  const res = await fetch("assets/data/products.json");
  const data = await res.json();
  return data;
}

async function initProducts() {
  if (!displayProducts) return; // not on the products page

  document.title =
    "Online Shopping in Pakistan: Fashion, Electronics & Groceries";

  products = await loadProducts();

  products.forEach((product) => {
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
                <span class="itemDiscount" style="color:grey!important;position:relative;top:2px;">${product.discount}</span>
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
  });
}

/* ─── 3. LOAD MORE BUTTON ────────────────────────────────── */

function initLoadMoreButton() {
  const loadProductsButton = document.getElementById("loadProductsButton");
  if (!loadProductsButton) return;

  loadProductsButton.addEventListener("click", (e) => {
    e.preventDefault();

    fetch("assets/data/products.json")
      .then((res) => res.json())
      .then((addProducts) => {
        for (let i = 0; i <= 5; i++) {
          if (!addProducts[i]) break; // guard against short arrays
          displayProducts.innerHTML += `
            <div class="col m-1">
              <div class="card">
                <a href="productPage.html?id=${addProducts[i].id}" style="color:inherit;text-decoration:none;">
                  <div class="img">
                    <img src="assets/products/${addProducts[i].link}" alt="${addProducts[i].title}">
                  </div>
                  <div class="cardDetail">
                    <p>${addProducts[i].title}</p>
                    <div class="itemPrice" style="display:flex;gap:4px;">
                      <p>RS.${addProducts[i].price}</p>
                      <span class="itemDiscount" style="color:grey!important;position:relative;top:4px;">${addProducts[i].discount}</span>
                    </div>
                    <div class="productRating">
                      <span>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                      </span>
                      <span class="comments">${addProducts[i].comments}</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>`;
        }
      })
      .catch((err) => console.error("Load more failed:", err));
  });
}

/* ─── 4. FLASH SALE ──────────────────────────────────────── */

function initFlashSaleLinks() {
  // Guard: element may not exist on every page
  const cardFsContent = document.getElementsByClassName("cardFsContent")[0];
  if (!cardFsContent) return;

  const cards = cardFsContent.querySelectorAll(".cards a");
  cards.forEach((card) => {
    const titleEl = card.querySelector("#fsProductTitle");
    const priceEl = card.querySelector("#fsProductPrice");
    const imgEl = card.querySelector("#fsProductImgLink");
    if (!titleEl || !priceEl || !imgEl) return;

    const fsProductTitle = titleEl.textContent;
    const fsProductPrice = priceEl.textContent;
    let fsProductImgLink = imgEl.getAttribute("src").replace("assets/", "");

    card.setAttribute(
      "href",
      `productPage.html?title=${encodeURIComponent(fsProductTitle)}&price=${fsProductPrice}&img=${fsProductImgLink}`
    );
    card.style.color = "inherit";
    card.style.textDecoration = "none";
  });
}

async function loadFlashSaleProducts() {
  const container = document.getElementById("product-container");
  if (!container) return; // not on a page with flash sale

  try {
    const response = await fetch("assets/data/flashSaleItems.json");
    const flashProducts = await response.json();

    container.innerHTML = flashProducts
      .map(
        (product) => `
      <div class="card">
        <a href="productPage.html?id=${product.id}" class="card-inner">
          <div class="img">
            <img src="${product.img}" alt="${product.title}">
          </div>
          <div class="cardDetail">
            <p class="product-title">${product.title}</p>
            <div class="itemPrice">
              <p>Rs.<span>${product.price.toLocaleString()}</span></p>
            </div>
            <div class="itemPriceDetail">
              <span>
                <span class="currency">RS</span>
                <span class="actualPrice">${product.actualPrice.toLocaleString()}</span>
              </span>
              <span class="itemDiscount">${product.discount}</span>
            </div>
          </div>
        </a>
      </div>`
      )
      .join("");
  } catch (error) {
    console.error("Error loading flash sale products:", error);
  }
}

/* ─── 5. CATEGORIES ──────────────────────────────────────── */

async function loadCategories() {
  const categoryList = document.getElementById("category-list");
  if (!categoryList) return; // not on a page with categories

  try {
    const response = await fetch("assets/data/categories.json");
    const categories = await response.json();

    categoryList.innerHTML = categories
      .map(
        (cat) => `
      <li class="col p-0">
        <a href="#" class="categories">
          <div class="categoryImg">
            <img src="${cat.img}" alt="${cat.name}">
          </div>
          <div class="categoryDetail">${cat.name}</div>
        </a>
      </li>`
      )
      .join("");
  } catch (error) {
    console.error("Error loading categories:", error);
  }
}

/* ─── 6. SCROLL & NAV BEHAVIOURS ────────────────────────── */

function initScrollBehaviours() {
  // Hide spacer after scrolling down
  const spacer = document.getElementById("spacer");
  if (spacer) {
    window.addEventListener("scroll", () => {
      spacer.style.display = window.scrollY > 50 ? "none" : "block";
    });
  }

  // Show sticky navigator after scrolling past 200 px
  const nav = document.querySelector(".navigatorMain");
  if (nav) {
    window.addEventListener("scroll", () => {
      nav.classList.toggle("show", window.scrollY > 200);
    });
  }

  // Intersection observer — highlight active nav link
  const sections = [
    { sectionId: "flashSale",   navId: "flashSale"  },
    { sectionId: "categories",  navId: "category"   },
    { sectionId: "just-for-you", navId: "justForYou" },
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const match = sections.find((s) => s.sectionId === entry.target.id);
        if (!match) return;
        const navEl = document.getElementById(match.navId);
        if (navEl) navEl.classList.toggle("active", entry.isIntersecting);
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.3 }
  );

  sections.forEach(({ sectionId }) => {
    const el = document.getElementById(sectionId);
    if (el) observer.observe(el);
  });
}

/* ─── 7. NAVIGATOR HELPER ────────────────────────────────── */

function getPosition(pos) {
  const navigatorMain = document.getElementsByClassName("navigatorMain")[0];
  if (!navigatorMain) return;
  const region = navigatorMain.querySelector(`#${pos}`);
  console.log(region);
}

/* ─── 8. BOOTSTRAP — load components, then run everything ── */

Promise.all([
  loadComponent("#login-modal-container",          "components/loginModal.html"),
  loadComponent("#signup-modal-container",         "components/signupModal.html"),
  loadComponent("#darazCareFooter-container",      "components/customerDarazCareFooter.html"),
  loadComponent("#paymentVerifyFooter-container",  "components/paymentVerifyFooter.html"),
  loadComponent("#darazVarietiesFooter-container", "components/darazVarietiesFooter.html"),
  loadComponent("#darazStoresFooter-container",    "components/darazStoresFooter.html"),
  loadComponent("#topHeader-container",            "components/topHeaderComponent.html"),
])
  .then(() => {
    // All component HTML is now in the DOM — safe to query any element.

    // Run inline feature initialisers (no extra script files needed)
    initScrollBehaviours();
    initFlashSaleLinks();

    // Async initialisers — run in parallel; each guards its own container
    return Promise.all([
      initProducts(),
      loadFlashSaleProducts(),
      loadCategories(),
    ]);
  })
  .then(() => {
    initLoadMoreButton();

    // Load remaining external scripts sequentially AFTER the DOM is ready
    return loadScriptsSequentially([
      "assets/scripts/loginSignup.js",
      "assets/scripts/messageDaraz.js",
    ]);
  })
  .catch((err) => console.error("Initialisation error:", err));