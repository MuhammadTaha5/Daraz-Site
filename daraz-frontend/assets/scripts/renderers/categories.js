export function renderCategories(categories) {
    const categoryList = document.getElementById("category-list");

    categoryList.innerHTML = "";

    categoryList.innerHTML = categories.map(
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
}

