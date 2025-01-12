document.addEventListener('DOMContentLoaded', () => {
    const isVentasPage = window.location.pathname.includes('ventas');
    console.log(isVentasPage);

    let productsData = [];
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    // Ocultar/mostrar la navbar al hacer scroll
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            // Scroll hacia abajo
            navbar.classList.add('hidden');
        } else {
            // Scroll hacia arriba
            navbar.classList.remove('hidden');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Para dispositivos móviles
    }, false);

    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            productsData = data.products;
            displayProducts(productsData);

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
                if (!isVentasPage) {
                    modal.find('#modalPrice').text('Precio: $' + price);
                }
            });

            // Añadir evento para la barra de búsqueda
            document.getElementById('searchInput').addEventListener('input', function () {
                const query = this.value.toLowerCase();
                const filteredProducts = productsData.filter(product =>
                    product.name.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query)
                );
                displayProducts(filteredProducts);
            });
        })
        .catch(error => console.error('Error cargando los productos:', error));

    function displayProducts(products) {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="images/${product.image}" alt="${product.name}" width="200" data-toggle="modal" data-target="#productModal" data-name="${product.name}" data-description="${product.description}" ${isVentasPage ? '' : `data-price="${product.price}"`} data-image="images/${product.image}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                ${isVentasPage ? '' : `<p><strong>Precio: ${product.price}</strong></p>`}
            `;
            productList.appendChild(productItem);
        });
    }
});
