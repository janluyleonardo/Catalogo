document.addEventListener('DOMContentLoaded', () => {
    const isVendedorPage = window.location.pathname.includes('vendedores.html');

    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            data.products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');
                productItem.innerHTML = `
                    <img src="images/${product.image}" alt="${product.name}" widt="120" data-toggle="modal" data-target="#productModal" data-name="${product.name}" data-description="${product.description}" ${isVendedorPage ? '' : `data-price="${product.price}"`} data-image="images/${product.image}">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    ${isVendedorPage ? '' : `<p>Precio: $${product.price}</p>`}
                `;
                productList.appendChild(productItem);
            });

            // Añadir evento para abrir el modal con la información del producto
            $('#productModal').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget);
                var name = button.data('name');
                var description = button.data('description');
                var price = button.data('price');
                var image = button.data('image');
                var modal = $(this);
                modal.find('#modalImage').attr('src', image);
                modal.find('#modalName').text(name);
                modal.find('#modalDescription').text(description);
                if (!isVendedorPage) {
                    modal.find('#modalPrice').text('Precio: $' + price);
                }
            });
        })
        .catch(error => console.error('Error cargando los productos:', error));
});
