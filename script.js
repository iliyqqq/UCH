// Массив продуктов
let products = [
    { name: "Молочный коктейль" },
    { name: "Смузи" }
];

// Функция для отрисовки всех продуктов
function renderProducts() {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';

    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <button class="delete-btn" onclick="deleteProduct(${index})">×</button>
            <div class="product-image">${product.name}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <button class="order-btn">Заказать</button>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Функция добавления нового продукта
function addProduct() {
    const input = document.getElementById('newProductName');
    const productName = input.value.trim();

    if (productName) {
        products.push({ name: productName });
        input.value = '';
        renderProducts();
    } else {
        alert('Пожалуйста, введите название продукта');
    }
}

// Функция удаления продукта
function deleteProduct(index) {
    if (confirm('Вы уверены, что хотите удалить этот продукт из меню?')) {
        products.splice(index, 1);
        renderProducts();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
});
