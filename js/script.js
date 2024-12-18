document.addEventListener('DOMContentLoaded', () => {
    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            data.products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');
                productItem.innerHTML = `
                    <img src="/images/${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                `;
                productList.appendChild(productItem);
            });
        })
        .catch(error => console.error('Error cargando los productos:', error));
});
