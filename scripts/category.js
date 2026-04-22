async function loadCategories() {
    try {
        const response = await fetch('assets/categories.json');
        const categories = await response.json();
        
        const categoryList = document.getElementById('category-list');

        categoryList.innerHTML = categories.map(cat => `
            <li>
                <a href="#" class="categories">
                    <div class="categoryImg">
                        <img src="${cat.img}" alt="${cat.name}">
                    </div>
                    <div class="categoryDetail">
                        ${cat.name}
                    </div>
                </a>
            </li>
        `).join('');

    } catch (error) {
        console.error("Error loading categories:", error);
    }
}

// Ensure this runs alongside your product loader
window.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    
});