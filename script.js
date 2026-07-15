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
    let cartItemsCount = 0;
    const unitPrice = 125.00;

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

    cartContainer.addEventListener('click', () => {
        cartDropdown.classList.toggle('show-cart');
    });

    addToCartBtn.addEventListener('click', () => {
        if (currentQuantity === 0) {
            return;
        }

        cartItemsCount += currentQuantity;
        currentQuantity = 0;
        quantityDisplay.textContent = currentQuantity;
        updateCartUI();
        cartDropdown.classList.add('show-cart');
    });

    cartContent.addEventListener('click', event => {
        if (event.target.closest('.delete-btn')) {
            clearCart();
        }
    });

    function updateCartUI() {
        if (cartItemsCount > 0) {
            cartBadge.style.display = 'block';
            cartBadge.textContent = cartItemsCount;

            const total = unitPrice * cartItemsCount;
            cartContent.innerHTML = `
                <div class="cart-item">
                    <img src="./img/rasm2.png" alt="Sneakers" class="cart-item-img" style="width: 50px; border-radius: 8px;">
                    <div class="cart-item-info">
                        <p>Fall Limited Edition Sneakers</p>
                        <p>$${unitPrice.toFixed(2)} x ${cartItemsCount} <b>$${total.toFixed(2)}</b></p>
                    </div>
                    <button class="delete-btn" type="button">Delete</button>
                </div>
                <button class="checkout-btn" type="button">Checkout</button>
            `;
        } else {
            clearCart();
        }
    }

    function clearCart() {
        cartItemsCount = 0;
        cartBadge.style.display = 'none';
        cartBadge.textContent = '0';
        cartContent.innerHTML = '<p class="empty-message">Your cart is empty.</p>';
    }

    clearCart();
});