// Инициализация данных из localStorage или создание массива по умолчанию
let products = JSON.parse(localStorage.getItem("products")) || [
    { name: "Молочный коктейль" },
    { name: "Смузи" }
];

// Функция для сохранения данных в localStorage
function saveToLocalStorage() {
    localStorage.setItem("products", JSON.stringify(products));
}

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
        saveToLocalStorage();
        renderProducts();
    } else {
        alert('Пожалуйста, введите название продукта');
    }
}

// Функция удаления продукта
function deleteProduct(index) {
    if (confirm('Вы уверены, что хотите удалить этот продукт из меню?')) {
        products.splice(index, 1);
        saveToLocalStorage();
        renderProducts();
    }
}

// Функция очистки всех данных
function clearAll() {
    if (confirm('Вы уверены, что хотите полностью очистить меню? Это действие нельзя отменить.')) {
        localStorage.removeItem("products");
        products = [];
        renderProducts();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
});
