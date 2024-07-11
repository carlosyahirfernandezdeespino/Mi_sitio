document.addEventListener('DOMContentLoaded', function() {
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        document.getElementById('welcomeMessage').innerText = 'Bienvenido, ' + loggedInUser.username + '!';
    } else {
        window.location.href = 'index.html';
    }

    const cardContainer = document.getElementById('card-container');
    const cartItemsContainer = document.getElementById('cartItemsContainer');

    const products = [
        {
            id: 1,
            imagen: 'af1tw.jpg',
            nombre: 'Air Force 1 Blanco',
            precio: '$2,800.00',
            descripcion: `
            El fulgor vive en el Nike Air Force 1 ’07, el OG de 
            básquetbol que le da un toque fresco a lo que
            mejor conoces: revestimientos con costuras 
            duraderas.`,
            existencia: 5
        },
        {
            id: 2,
            imagen: 'jordan4levis.jpg',
            nombre: 'Jordan retro 4 Levis',
            precio: '$2,800.00',
            descripcion: `
            Air Jordan 4 Retro NRG Levi's en algodón de Jordan 
            con puntera de almendra, cierre con agujetas en la
            parte delantera, parche del logo en la lengüeta.`,
            existencia: 5
        },
        {
            id: 2,
            imagen: 'jordan4levis.jpg',
            nombre: 'Jordan retro 4 Levis',
            precio: '$2,800.00',
            descripcion: `
            Air Jordan 4 Retro NRG Levi's en algodón de Jordan 
            con puntera de almendra, cierre con agujetas en la
            parte delantera, parche del logo en la lengüeta.`,
            existencia: 5
        },
        {
            id: 2,
            imagen: 'jordan4levis.jpg',
            nombre: 'Jordan retro 4 Levis',
            precio: '$2,800.00',
            descripcion: `
            Air Jordan 4 Retro NRG Levi's en algodón de Jordan 
            con puntera de almendra, cierre con agujetas en la
            parte delantera, parche del logo en la lengüeta.`,
            existencia: 5
        },
        {
            id: 2,
            imagen: 'jordan4levis.jpg',
            nombre: 'Jordan retro 4 Levis',
            precio: '$2,800.00',
            descripcion: `
            Air Jordan 4 Retro NRG Levi's en algodón de Jordan 
            con puntera de almendra, cierre con agujetas en la
            parte delantera, parche del logo en la lengüeta.`,
            existencia: 5
        },{
            id: 2,
            imagen: 'jordan4levis.jpg',
            nombre: 'Jordan retro 4 Levis',
            precio: '$2,800.00',
            descripcion: `
            Air Jordan 4 Retro NRG Levi's en algodón de Jordan 
            con puntera de almendra, cierre con agujetas en la
            parte delantera, parche del logo en la lengüeta.`,
            existencia: 5
        },{
            id: 2,
            imagen: 'jordan4levis.jpg',
            nombre: 'Jordan retro 4 Levis',
            precio: '$2,800.00',
            descripcion: `
            Air Jordan 4 Retro NRG Levi's en algodón de Jordan 
            con puntera de almendra, cierre con agujetas en la
            parte delantera, parche del logo en la lengüeta.`,
            existencia: 5
        }
    ];
      // Cargar productos en tarjetas
      products.forEach((product) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${product.imagen}" alt="${product.nombre}">
                    <h3>${product.nombre}</h3>
                </div>
                <div class="card-back">
                    <h3>${product.nombre}</h3>
                    <p>${product.precio}</p>
                    <p>${product.descripcion}</p>
                    <p>Existencia: ${product.existencia}</p>
                    <button onclick="addToCart(${product.id})">Añadir al Carrito</button>
                </div>
            </div>
        `;
        cardContainer.appendChild(card);
    });

    let cartCount = 0;
    let cart = [];

    function showAlert(message) {
        Swal.fire({
            icon: 'info',
            title: 'Información',
            text: message,
            confirmButtonText: 'OK'
        });
    }

    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.product.id === productId);

        if (product) {
            if (cartItem) {
                if (cartItem.cantidad < product.existencia) {
                    cartItem.cantidad++;
                    cartCount++;
                } else {
                    showAlert("No hay suficientes pares en existencia.");
                }
            } else {
                if (product.existencia > 0) {
                    cart.push({ product, cantidad: 1 });
                    cartCount++;
                } else {
                    showAlert("No hay suficientes pares en existencia.");
                }
            }
            document.getElementById('cartCount').textContent = cartCount;
            updateCartItems();
        }
    };

    window.completePurchase = function() {
        let stockSufficient = true;
        cart.forEach(item => {
            if (item.cantidad > item.product.existencia) {
                stockSufficient = false;
            }
        });

        if (stockSufficient) {
            if (cart.length > 0) {
                let purchaseDetails = 'Tu compra se ha realizado:\n';
                cart.forEach(item => {
                    purchaseDetails += `${item.product.nombre} - Cantidad: ${item.cantidad}\n`;
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Compra realizada',
                    text: purchaseDetails,
                    confirmButtonText: 'OK'
                }).then(() => {
                    $('#cartModal').modal('hide'); // Cerrar el modal del carrito
                });
                cart = [];
                cartCount = 0;
                document.getElementById('cartCount').textContent = cartCount;
                updateCartItems();
            } else {
                showAlert("Tu carrito está vacío.");
            }
        } else {
            showAlert("No hay suficientes pares en existencia para completar la compra.");
        }
    };

    function updateCartItems() {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item d-flex justify-content-between align-items-center';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.product.imagen}" alt="${item.product.nombre}" class="cart_img">
                </div>
                <div class="cart-item-details text-center">
                    <h5>${item.product.nombre}</h5>
                    <p>Cantidad: ${item.cantidad}</p>
                </div>
                <button class="btn btn-outline-danger" onclick="removeFromCart(${index})">
                    <i class="bi bi-trash"></i>
                </button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    window.removeFromCart = function(index) {
        if (index >= 0 && index < cart.length) {
            const cartItem = cart[index];
            cartItem.cantidad--;
            cartCount--;

            if (cartItem.cantidad === 0) {
                cart.splice(index, 1);
            }

            document.getElementById('cartCount').textContent = cartCount;
            updateCartItems();
        }
    };

    updateCartItems();
});