import { getProducts } from "./services/products.js";
import { getCategories } from "./services/categories.js";
import { getFlashSaleProducts } from "./services/flashSale.js"
import { renderProducts } from "./renderers/products.js";
import { renderCategories } from "./renderers/categories.js";
import { renderFlashSale } from "./renderers/flashSale.js";


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
async function init() {
  const products = await getProducts();
  renderProducts(products);

  const categories = await getCategories();
  renderCategories(categories);

  const flashSale = await getFlashSaleProducts();
  renderFlashSale(flashSale);
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
    // initFlashSaleLinks();

    // Async initialisers — run in parallel; each guards its own container
    return Promise.all([
      // initProducts(),

      // loadFlashSaleProducts(),
      // loadCategories(),
      init()
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