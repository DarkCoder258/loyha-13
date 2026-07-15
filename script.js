document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    const minusBtn = document.querySelector('.minus-btn');
    const plusBtn = document.querySelector('.plus-btn');
    const quantityDisplay = document.querySelector('.quantity-display');

    const addToCartBtn = document.querySelector('.add-to-cart');
    const cartContainer = document.querySelector('.cart-container');
    const cartDropdown = document.querySelector('.cart-dropdown');
    const cartBadge = document.querySelector('.cart-badge');
    const cartContent = document.querySelector('.cart-content');

    let currentQuantity = 0;

    const unitPrice = 125.00;

    // Represent cart as an array of items so we can compute line totals
    const cartItems = [];
    const product = {
        id: 'sneaker-1',
        title: 'Fall Limited Edition Sneakers',
        img: './img/rasm2.png',
        price: unitPrice
    };

    if (!mainImage || thumbnails.length === 0 || !minusBtn || !plusBtn || !quantityDisplay || !addToCartBtn || !cartContainer || !cartDropdown || !cartBadge || !cartContent) {
        return;
    }

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
            mainImage.src = this.src;
        });
    });

    minusBtn.addEventListener('click', () => {
        if (currentQuantity > 0) {
            currentQuantity--;
            quantityDisplay.textContent = currentQuantity;
        }
    });

    plusBtn.addEventListener('click', () => {
        currentQuantity++;
        quantityDisplay.textContent = currentQuantity;
    });

    // Toggle cart dropdown
    cartContainer.addEventListener('click', () => {
        cartDropdown.classList.toggle('show-cart');
    });

    // Add current selection to cart
    addToCartBtn.addEventListener('click', () => {
        if (currentQuantity === 0) return;

        const existing = cartItems.find(i => i.id === product.id);
        if (existing) {
            existing.qty += currentQuantity;
        } else {
            cartItems.push({ id: product.id, title: product.title, img: product.img, price: product.price, qty: currentQuantity });
        }

        // reset selection
        currentQuantity = 0;
        quantityDisplay.textContent = currentQuantity;

        updateCartUI();
        cartDropdown.classList.add('show-cart');
    });

    // Handle delete per line using event delegation
    cartContent.addEventListener('click', (e) => {
        const del = e.target.closest('.delete-btn');
        if (!del) return;
        const id = del.dataset.id;
        const idx = cartItems.findIndex(i => i.id === id);
        if (idx !== -1) {
            cartItems.splice(idx, 1);
            updateCartUI();
        }
    });

    function updateCartUI() {
        const totalQty = cartItems.reduce((s, i) => s + i.qty, 0);
        if (totalQty > 0) {
            cartBadge.style.display = 'block';
            cartBadge.textContent = totalQty;

            const lines = cartItems.map(i => {
                const lineTotal = i.price * i.qty;
                return `
                <div class="cart-item">
                    <img src="${i.img}" alt="${i.title}" class="cart-item-img" style="width:50px; border-radius:8px;">
                    <div class="cart-item-info">
                        <p>${i.title}</p>
                        <p>$${i.price.toFixed(2)} x ${i.qty} <b>$${lineTotal.toFixed(2)}</b></p>
                    </div>
                    <button class="delete-btn" type="button" data-id="${i.id}">Delete</button>
                </div>`;
            }).join('');

            const grandTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

            cartContent.innerHTML = `
                ${lines}
                <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;font-weight:bold;padding-top:10px;border-top:1px solid #eee;">
                    <span>Total</span>
                    <span>$${grandTotal.toFixed(2)}</span>
                </div>
                <button class="checkout-btn" type="button" style="margin-top:12px;">Checkout</button>
            `;
        } else {
            clearCart();
        }
    }

    function clearCart() {
        cartItems.length = 0;
        cartBadge.style.display = 'none';
        cartBadge.textContent = '0';
        cartContent.innerHTML = '<p class="empty-message">Your cart is empty.</p>';
    }

    clearCart();
});