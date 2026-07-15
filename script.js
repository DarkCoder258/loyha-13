// HTML elementlarini tanlab olamiz
const minusBtn = document.getElementById('minus-btn');
const plusBtn = document.getElementById('plus-btn');
const qtyValue = document.getElementById('qty-value');
const totalValue = document.getElementById('total-value');

// Bitta mahsulot narxi va boshlang'ich miqdor
const unitPrice = 125.00;
let quantity = 1;

// Ekrandagi qiymatlarni yangilash funksiyasi
function updatePrice() {
  qtyValue.textContent = quantity;
  const totalPrice = quantity * unitPrice;
  // Narxni verguldan keyin 2 ta raqam bilan chiroyli chiqarish
  totalValue.textContent = `$${totalPrice.toFixed(2)}`;
}

// Plyus (+) tugmasi bosilganda
plusBtn.addEventListener('click', () => {
  quantity++;
  updatePrice();
});

// Minus (-) tugmasi bosilganda (1 tadan kamayib ketmasligi kerak)
minusBtn.addEventListener('click', () => {
  if (quantity > 1) {
    quantity--;
    updatePrice();
  }
});