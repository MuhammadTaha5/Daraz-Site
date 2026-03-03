let products = [];

async function loadProducts() {
    const res = await fetch("assets/products.json");
    const data = await res.json();
    return data;
}

async function init() {
    products = await loadProducts();
    products.forEach(product => {
        console.log(product)
        
    });
    
}

init();
